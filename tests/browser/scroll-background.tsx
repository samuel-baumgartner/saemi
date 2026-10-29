// Browser regression fixture. Copy to src/app/animation-test/page.tsx temporarily,
// run next dev, then open /animation-test?mode=normal (also slow, failure, reduced).
// Test normal at desktop and mobile widths. Remove the temporary route afterward.
// Pixel readback tests correctness; RAF timings include readback-induced software
// rendering and are not a GPU performance benchmark.
"use client";
import { useEffect, useState } from "react";
import ScrollBackground from "@/components/ScrollBackground";
import names from "@/data/ball-sequence.json";

export default function Test() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode") || "normal";
    const nativeMatchMedia = window.matchMedia;
    if(mode==='reduced') window.matchMedia = ((query: string) => {
      const result=nativeMatchMedia(query);
      if(query==='(prefers-reduced-motion: reduce)') Object.defineProperty(result,'matches',{value:true});
      return result;
    });
    const nativeFetch = window.fetch;
    const nativeDecode = window.createImageBitmap;
    let fetches = 0, decodes = 0, errors = 0;
    const onError = () => { errors++; };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onError);
    window.fetch = async (...args) => {
      if (String(args[0]).includes("ball-sequence")) {
        fetches++;
        if (mode === "slow") await new Promise(r => setTimeout(r, 120));
        if (mode === "failure" && String(args[0]).includes(names[8])) return new Response("", {status: 503});
      }
      return nativeFetch(...args);
    };
    window.createImageBitmap = (async (...args: Parameters<typeof createImageBitmap>) => {
      decodes++;
      return Reflect.apply(nativeDecode, window, args);
    }) as typeof createImageBitmap;
    const report = document.getElementById("report")!;
    const tick = () => new Promise<void>(r => requestAnimationFrame(() => r()));
    const pause = (ms: number) => new Promise(r => setTimeout(r, ms));
    const result: Record<string, unknown> = { mode };
    let alive = true;
    queueMicrotask(() => setMounted(true));
    void (async () => {
      let canvas: HTMLCanvasElement | null = null;
      for (let i=0; i<100 && !canvas; i++) { await pause(20); canvas=document.querySelector('.scroll-background canvas'); }
      if (!alive) return;
      if (!canvas) throw new Error('Canvas missing');
      const ctx=canvas.getContext('2d')!;
      const expected=document.createElement('canvas'); expected.width=canvas.width;expected.height=canvas.height;
      const ref=expected.getContext('2d', {alpha:false,willReadFrequently:true})!;
      const reference: ImageBitmap[]=[];
      // Independent reference decoder is not counted as component activity.
      for(const name of names) reference.push(await nativeDecode(await (await nativeFetch(`/ball-sequence/${name}-${canvas.width}.webp`)).blob()));
      const pixelHash=(c:CanvasRenderingContext2D) => {
        const pixels=c.getImageData(0,0,canvas!.width,canvas!.height).data;
        let hash=2166136261;
        for(let i=0;i<pixels.length;i+=16) hash=Math.imul(hash^pixels[i],16777619);
        return hash>>>0;
      };
      const expectedHash=(position:number) => {
        ref.globalAlpha=1;ref.drawImage(reference[Math.floor(position)],0,0);
        if(Math.ceil(position)!==Math.floor(position)) { ref.globalAlpha=position%1;ref.drawImage(reference[Math.ceil(position)],0,0); }
        return pixelHash(ref);
      };
      const end=()=>document.getElementById('projects')!.getBoundingClientRect().top+scrollY-innerHeight*.5;
      if(mode==='slow') {
        scrollTo(0,end()*.7);await tick();await tick();
        result.posterDuringLoading=pixelHash(ctx)===expectedHash(0);
      }
      for(let i=0;i<300;i++) {
        if (mode==='failure' ? fetches>=9 : decodes>=(mode==='reduced'?1:names.length)) break;
        await pause(50);
      }
      await pause(mode==='failure'?500:200);
      const initialFetches=fetches, initialDecodes=decodes;
      let mismatch=0, blank=0; const mismatches: unknown[]=[];
      const scrollPositions=[0,.001,.12,.85,.3,1,.65,.1,.99,0,.44,.45,.46,.1,1,0];
      for(const value of scrollPositions) {
        scrollTo(0,end()*value); await tick();await tick();
        const position=(mode==='failure'||mode==='reduced')?0:Math.max(0,Math.min(1,scrollY/end()))*(names.length-1);
        if(pixelHash(ctx)!==expectedHash(position)) { mismatch++; mismatches.push({value,position,actual:pixelHash(ctx),expected:expectedHash(position)}); }
        const pixels=ctx.getImageData(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2).data;
        if(!pixels.some((v,i)=>i%4!==3&&v>10)) blank++;
      }
      let maxFrameMs=0;const timings:number[]=[];
      let last=performance.now();
      for(let i=0;i<120;i++) {
        scrollTo(0,end()*(i<60?i/60:(120-i)/60));await tick();
        const now=performance.now();timings.push(now-last);last=now;
      }
      maxFrameMs=Math.max(...timings);
      timings.sort((a,b)=>a-b);
      Object.assign(result,{width:canvas.width,fetches,decodes,extraFetches:fetches-initialFetches,extraDecodes:decodes-initialDecodes,checkedPositions:scrollPositions.length,mismatches,mismatchedFrames:mismatch,blankFrames:blank,errors,p95FrameMs:Math.round(timings[114]*10)/10,maxFrameMs:Math.round(maxFrameMs*10)/10});
      result.pass=mismatch===0&&blank===0&&errors===0&&fetches===initialFetches&&decodes===initialDecodes&&(mode!=='slow'||result.posterDuringLoading);
      if(alive) report.textContent=JSON.stringify(result,null,2);
      reference.forEach(frame=>frame.close());
    })().catch(e=>{report.textContent=JSON.stringify({error:String(e)});});
    return()=>{alive=false;window.matchMedia=nativeMatchMedia;window.fetch=nativeFetch;window.createImageBitmap=nativeDecode;window.removeEventListener('error',onError);window.removeEventListener('unhandledrejection',onError);};
  },[]);
  return <><pre id="report" style={{position:'fixed',zIndex:99,background:'white',color:'black',top:0}}>Testing…</pre>{mounted&&<ScrollBackground/>}<main style={{height:5000}}><div id="projects" style={{position:'absolute',top:3000}}>Projects</div></main></>;
}
