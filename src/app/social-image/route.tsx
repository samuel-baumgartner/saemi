import { ImageResponse } from 'next/og';
import { getProjectSummary } from '@/data/projectSummaries';
import { site } from '@/lib/seo';

export async function GET(request: Request) {
  const projectId = new URL(request.url).searchParams.get('project');
  const project = projectId ? getProjectSummary(projectId) : undefined;
  if (projectId && !project) return new Response('Project not found', { status: 404 });

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '64px 72px', background: 'linear-gradient(135deg, #15273c, #0b1018)', color: '#f8fafc', fontFamily: 'sans-serif', border: '2px solid #31516f' }}>
      <div style={{ display: 'flex', fontSize: 24, color: '#7dd3fc', letterSpacing: 3 }}>ELECTRICAL ENGINEERING · ETH ZÜRICH</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: project ? 62 : 80, lineHeight: 1.1, fontWeight: 700, letterSpacing: -2 }}>{project?.shortTitle ?? site.name}</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#cbd5e1' }}>{project ? `A project by ${site.name}` : 'Robotics · Control systems · Embedded software'}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#94a3b8', borderTop: '1px solid #31516f', paddingTop: 28 }}>samuelbaumgartner.ch{project ? `/projects/${project.id}` : ''}</div>
    </div>,
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400' } },
  );
}
