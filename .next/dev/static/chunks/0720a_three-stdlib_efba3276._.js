(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/interactive/SelectionBox.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionBox",
    ()=>SelectionBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const frustum = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Frustum"]();
const center = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const tmpPoint = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecNear = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecTopLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecTopRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecDownRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecDownLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarTopLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarTopRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarDownRight = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vecFarDownLeft = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp1 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp2 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const vectemp3 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class SelectionBox {
    constructor(camera, scene, deep){
        this.camera = camera;
        this.scene = scene;
        this.startPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this.endPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this.collection = [];
        this.deep = deep || Number.MAX_VALUE;
    }
    select(startPoint, endPoint) {
        this.startPoint = startPoint || this.startPoint;
        this.endPoint = endPoint || this.endPoint;
        this.collection = [];
        this.updateFrustum(this.startPoint, this.endPoint);
        this.searchChildInFrustum(frustum, this.scene);
        return this.collection;
    }
    updateFrustum(startPoint, endPoint) {
        startPoint = startPoint || this.startPoint;
        endPoint = endPoint || this.endPoint;
        if (startPoint.x === endPoint.x) {
            endPoint.x += Number.EPSILON;
        }
        if (startPoint.y === endPoint.y) {
            endPoint.y += Number.EPSILON;
        }
        this.camera.updateProjectionMatrix();
        this.camera.updateMatrixWorld();
        if (this.camera.isPerspectiveCamera) {
            tmpPoint.copy(startPoint);
            tmpPoint.x = Math.min(startPoint.x, endPoint.x);
            tmpPoint.y = Math.max(startPoint.y, endPoint.y);
            endPoint.x = Math.max(startPoint.x, endPoint.x);
            endPoint.y = Math.min(startPoint.y, endPoint.y);
            vecNear.setFromMatrixPosition(this.camera.matrixWorld);
            vecTopLeft.copy(tmpPoint);
            vecTopRight.set(endPoint.x, tmpPoint.y, 0);
            vecDownRight.copy(endPoint);
            vecDownLeft.set(tmpPoint.x, endPoint.y, 0);
            vecTopLeft.unproject(this.camera);
            vecTopRight.unproject(this.camera);
            vecDownRight.unproject(this.camera);
            vecDownLeft.unproject(this.camera);
            vectemp1.copy(vecTopLeft).sub(vecNear);
            vectemp2.copy(vecTopRight).sub(vecNear);
            vectemp3.copy(vecDownRight).sub(vecNear);
            vectemp1.normalize();
            vectemp2.normalize();
            vectemp3.normalize();
            vectemp1.multiplyScalar(this.deep);
            vectemp2.multiplyScalar(this.deep);
            vectemp3.multiplyScalar(this.deep);
            vectemp1.add(vecNear);
            vectemp2.add(vecNear);
            vectemp3.add(vecNear);
            var planes = frustum.planes;
            planes[0].setFromCoplanarPoints(vecNear, vecTopLeft, vecTopRight);
            planes[1].setFromCoplanarPoints(vecNear, vecTopRight, vecDownRight);
            planes[2].setFromCoplanarPoints(vecDownRight, vecDownLeft, vecNear);
            planes[3].setFromCoplanarPoints(vecDownLeft, vecTopLeft, vecNear);
            planes[4].setFromCoplanarPoints(vecTopRight, vecDownRight, vecDownLeft);
            planes[5].setFromCoplanarPoints(vectemp3, vectemp2, vectemp1);
            planes[5].normal.multiplyScalar(-1);
        } else if (this.camera.isOrthographicCamera) {
            const left = Math.min(startPoint.x, endPoint.x);
            const top = Math.max(startPoint.y, endPoint.y);
            const right = Math.max(startPoint.x, endPoint.x);
            const down = Math.min(startPoint.y, endPoint.y);
            vecTopLeft.set(left, top, -1);
            vecTopRight.set(right, top, -1);
            vecDownRight.set(right, down, -1);
            vecDownLeft.set(left, down, -1);
            vecFarTopLeft.set(left, top, 1);
            vecFarTopRight.set(right, top, 1);
            vecFarDownRight.set(right, down, 1);
            vecFarDownLeft.set(left, down, 1);
            vecTopLeft.unproject(this.camera);
            vecTopRight.unproject(this.camera);
            vecDownRight.unproject(this.camera);
            vecDownLeft.unproject(this.camera);
            vecFarTopLeft.unproject(this.camera);
            vecFarTopRight.unproject(this.camera);
            vecFarDownRight.unproject(this.camera);
            vecFarDownLeft.unproject(this.camera);
            var planes = frustum.planes;
            planes[0].setFromCoplanarPoints(vecTopLeft, vecFarTopLeft, vecFarTopRight);
            planes[1].setFromCoplanarPoints(vecTopRight, vecFarTopRight, vecFarDownRight);
            planes[2].setFromCoplanarPoints(vecFarDownRight, vecFarDownLeft, vecDownLeft);
            planes[3].setFromCoplanarPoints(vecFarDownLeft, vecFarTopLeft, vecTopLeft);
            planes[4].setFromCoplanarPoints(vecTopRight, vecDownRight, vecDownLeft);
            planes[5].setFromCoplanarPoints(vecFarDownRight, vecFarTopRight, vecFarTopLeft);
            planes[5].normal.multiplyScalar(-1);
        } else {
            console.error("THREE.SelectionBox: Unsupported camera type.");
        }
    }
    searchChildInFrustum(frustum2, object) {
        if (object.isMesh || object.isLine || object.isPoints) {
            if (object.material !== void 0) {
                if (object.geometry.boundingSphere === null) object.geometry.computeBoundingSphere();
                center.copy(object.geometry.boundingSphere.center);
                center.applyMatrix4(object.matrixWorld);
                if (frustum2.containsPoint(center)) {
                    this.collection.push(object);
                }
            }
        }
        if (object.children.length > 0) {
            for(let x = 0; x < object.children.length; x++){
                this.searchChildInFrustum(frustum2, object.children[x]);
            }
        }
    }
}
;
 //# sourceMappingURL=SelectionBox.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineSegmentsGeometry",
    ()=>LineSegmentsGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const _box = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
const _vector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class LineSegmentsGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedBufferGeometry"] {
    constructor(){
        super();
        this.isLineSegmentsGeometry = true;
        this.type = "LineSegmentsGeometry";
        const positions = [
            -1,
            2,
            0,
            1,
            2,
            0,
            -1,
            1,
            0,
            1,
            1,
            0,
            -1,
            0,
            0,
            1,
            0,
            0,
            -1,
            -1,
            0,
            1,
            -1,
            0
        ];
        const uvs = [
            -1,
            2,
            1,
            2,
            -1,
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            -1,
            -2,
            1,
            -2
        ];
        const index = [
            0,
            2,
            1,
            2,
            3,
            1,
            2,
            4,
            3,
            4,
            5,
            3,
            4,
            6,
            5,
            6,
            7,
            5
        ];
        this.setIndex(index);
        this.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](positions, 3));
        this.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
    }
    applyMatrix4(matrix) {
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0) {
            start.applyMatrix4(matrix);
            end.applyMatrix4(matrix);
            start.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    setPositions(array) {
        let lineSegments;
        if (array instanceof Float32Array) {
            lineSegments = array;
        } else if (Array.isArray(array)) {
            lineSegments = new Float32Array(array);
        }
        const instanceBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](lineSegments, 6, 1);
        this.setAttribute("instanceStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceBuffer, 3, 0));
        this.setAttribute("instanceEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceBuffer, 3, 3));
        this.computeBoundingBox();
        this.computeBoundingSphere();
        return this;
    }
    setColors(array, itemSize = 3) {
        let colors;
        if (array instanceof Float32Array) {
            colors = array;
        } else if (Array.isArray(array)) {
            colors = new Float32Array(array);
        }
        const instanceColorBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](colors, itemSize * 2, 1);
        this.setAttribute("instanceColorStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceColorBuffer, itemSize, 0));
        this.setAttribute("instanceColorEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceColorBuffer, itemSize, itemSize));
        return this;
    }
    fromWireframeGeometry(geometry) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    fromEdgesGeometry(geometry) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    fromMesh(mesh) {
        this.fromWireframeGeometry(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WireframeGeometry"](mesh.geometry));
        return this;
    }
    fromLineSegments(lineSegments) {
        const geometry = lineSegments.geometry;
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
        }
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0 && end !== void 0) {
            this.boundingBox.setFromBufferAttribute(start);
            _box.setFromBufferAttribute(end);
            this.boundingBox.union(_box);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
        }
        if (this.boundingBox === null) {
            this.computeBoundingBox();
        }
        const start = this.attributes.instanceStart;
        const end = this.attributes.instanceEnd;
        if (start !== void 0 && end !== void 0) {
            const center = this.boundingSphere.center;
            this.boundingBox.getCenter(center);
            let maxRadiusSq = 0;
            for(let i = 0, il = start.count; i < il; i++){
                _vector.fromBufferAttribute(start, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));
                _vector.fromBufferAttribute(end, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));
            }
            this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
            if (isNaN(this.boundingSphere.radius)) {
                console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
            }
        }
    }
    toJSON() {}
    applyMatrix(matrix) {
        console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().");
        return this.applyMatrix4(matrix);
    }
}
;
 //# sourceMappingURL=LineSegmentsGeometry.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineMaterial",
    ()=>LineMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
;
class LineMaterial extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"] {
    constructor(parameters){
        super({
            type: "LineMaterial",
            uniforms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].merge([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UniformsLib"].common,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UniformsLib"].fog,
                {
                    worldUnits: {
                        value: 1
                    },
                    linewidth: {
                        value: 1
                    },
                    resolution: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1)
                    },
                    dashOffset: {
                        value: 0
                    },
                    dashScale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    gapSize: {
                        value: 1
                    }
                }
            ])),
            vertexShader: /* glsl */ `
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,
            fragmentShader: /* glsl */ `
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,
            clipping: true
        });
        this.isLineMaterial = true;
        this.onBeforeCompile = function() {
            if (this.transparent) {
                this.defines.USE_LINE_COLOR_ALPHA = "1";
            } else {
                delete this.defines.USE_LINE_COLOR_ALPHA;
            }
        };
        Object.defineProperties(this, {
            color: {
                enumerable: true,
                get: function() {
                    return this.uniforms.diffuse.value;
                },
                set: function(value) {
                    this.uniforms.diffuse.value = value;
                }
            },
            worldUnits: {
                enumerable: true,
                get: function() {
                    return "WORLD_UNITS" in this.defines;
                },
                set: function(value) {
                    if (value === true) {
                        this.defines.WORLD_UNITS = "";
                    } else {
                        delete this.defines.WORLD_UNITS;
                    }
                }
            },
            linewidth: {
                enumerable: true,
                get: function() {
                    return this.uniforms.linewidth.value;
                },
                set: function(value) {
                    this.uniforms.linewidth.value = value;
                }
            },
            dashed: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_DASH" in this.defines);
                },
                set (value) {
                    if (Boolean(value) !== Boolean("USE_DASH" in this.defines)) {
                        this.needsUpdate = true;
                    }
                    if (value === true) {
                        this.defines.USE_DASH = "";
                    } else {
                        delete this.defines.USE_DASH;
                    }
                }
            },
            dashScale: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashScale.value;
                },
                set: function(value) {
                    this.uniforms.dashScale.value = value;
                }
            },
            dashSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashSize.value;
                },
                set: function(value) {
                    this.uniforms.dashSize.value = value;
                }
            },
            dashOffset: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashOffset.value;
                },
                set: function(value) {
                    this.uniforms.dashOffset.value = value;
                }
            },
            gapSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.gapSize.value;
                },
                set: function(value) {
                    this.uniforms.gapSize.value = value;
                }
            },
            opacity: {
                enumerable: true,
                get: function() {
                    return this.uniforms.opacity.value;
                },
                set: function(value) {
                    this.uniforms.opacity.value = value;
                }
            },
            resolution: {
                enumerable: true,
                get: function() {
                    return this.uniforms.resolution.value;
                },
                set: function(value) {
                    this.uniforms.resolution.value.copy(value);
                }
            },
            alphaToCoverage: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_ALPHA_TO_COVERAGE" in this.defines);
                },
                set: function(value) {
                    if (Boolean(value) !== Boolean("USE_ALPHA_TO_COVERAGE" in this.defines)) {
                        this.needsUpdate = true;
                    }
                    if (value === true) {
                        this.defines.USE_ALPHA_TO_COVERAGE = "";
                        this.extensions.derivatives = true;
                    } else {
                        delete this.defines.USE_ALPHA_TO_COVERAGE;
                        this.extensions.derivatives = false;
                    }
                }
            }
        });
        this.setValues(parameters);
    }
}
;
 //# sourceMappingURL=LineMaterial.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/uv1.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UV1",
    ()=>UV1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
;
const UV1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 125 ? "uv1" : "uv2";
;
 //# sourceMappingURL=uv1.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineSegments2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineSegments2",
    ()=>LineSegments2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/uv1.js [app-client] (ecmascript)");
;
;
;
;
const _viewport = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _start = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _end = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _start4 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _end4 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _ssOrigin = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
const _ssOrigin3 = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _mvMatrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
const _line = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line3"]();
const _closestPoint = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _box = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
const _sphere = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
const _clipToWorldVector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]();
let _ray, _lineWidth;
function getWorldSpaceHalfWidth(camera, distance, resolution) {
    _clipToWorldVector.set(0, 0, -distance, 1).applyMatrix4(camera.projectionMatrix);
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w);
    _clipToWorldVector.x = _lineWidth / resolution.width;
    _clipToWorldVector.y = _lineWidth / resolution.height;
    _clipToWorldVector.applyMatrix4(camera.projectionMatrixInverse);
    _clipToWorldVector.multiplyScalar(1 / _clipToWorldVector.w);
    return Math.abs(Math.max(_clipToWorldVector.x, _clipToWorldVector.y));
}
function raycastWorldUnits(lineSegments, intersects) {
    const matrixWorld = lineSegments.matrixWorld;
    const geometry = lineSegments.geometry;
    const instanceStart = geometry.attributes.instanceStart;
    const instanceEnd = geometry.attributes.instanceEnd;
    const segmentCount = Math.min(geometry.instanceCount, instanceStart.count);
    for(let i = 0, l = segmentCount; i < l; i++){
        _line.start.fromBufferAttribute(instanceStart, i);
        _line.end.fromBufferAttribute(instanceEnd, i);
        _line.applyMatrix4(matrixWorld);
        const pointOnLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        _ray.distanceSqToSegment(_line.start, _line.end, point, pointOnLine);
        const isInside = point.distanceTo(pointOnLine) < _lineWidth * 0.5;
        if (isInside) {
            intersects.push({
                point,
                pointOnLine,
                distance: _ray.origin.distanceTo(point),
                object: lineSegments,
                face: null,
                faceIndex: i,
                uv: null,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UV1"]]: null
            });
        }
    }
}
function raycastScreenSpace(lineSegments, camera, intersects) {
    const projectionMatrix = camera.projectionMatrix;
    const material = lineSegments.material;
    const resolution = material.resolution;
    const matrixWorld = lineSegments.matrixWorld;
    const geometry = lineSegments.geometry;
    const instanceStart = geometry.attributes.instanceStart;
    const instanceEnd = geometry.attributes.instanceEnd;
    const segmentCount = Math.min(geometry.instanceCount, instanceStart.count);
    const near = -camera.near;
    _ray.at(1, _ssOrigin);
    _ssOrigin.w = 1;
    _ssOrigin.applyMatrix4(camera.matrixWorldInverse);
    _ssOrigin.applyMatrix4(projectionMatrix);
    _ssOrigin.multiplyScalar(1 / _ssOrigin.w);
    _ssOrigin.x *= resolution.x / 2;
    _ssOrigin.y *= resolution.y / 2;
    _ssOrigin.z = 0;
    _ssOrigin3.copy(_ssOrigin);
    _mvMatrix.multiplyMatrices(camera.matrixWorldInverse, matrixWorld);
    for(let i = 0, l = segmentCount; i < l; i++){
        _start4.fromBufferAttribute(instanceStart, i);
        _end4.fromBufferAttribute(instanceEnd, i);
        _start4.w = 1;
        _end4.w = 1;
        _start4.applyMatrix4(_mvMatrix);
        _end4.applyMatrix4(_mvMatrix);
        const isBehindCameraNear = _start4.z > near && _end4.z > near;
        if (isBehindCameraNear) {
            continue;
        }
        if (_start4.z > near) {
            const deltaDist = _start4.z - _end4.z;
            const t = (_start4.z - near) / deltaDist;
            _start4.lerp(_end4, t);
        } else if (_end4.z > near) {
            const deltaDist = _end4.z - _start4.z;
            const t = (_end4.z - near) / deltaDist;
            _end4.lerp(_start4, t);
        }
        _start4.applyMatrix4(projectionMatrix);
        _end4.applyMatrix4(projectionMatrix);
        _start4.multiplyScalar(1 / _start4.w);
        _end4.multiplyScalar(1 / _end4.w);
        _start4.x *= resolution.x / 2;
        _start4.y *= resolution.y / 2;
        _end4.x *= resolution.x / 2;
        _end4.y *= resolution.y / 2;
        _line.start.copy(_start4);
        _line.start.z = 0;
        _line.end.copy(_end4);
        _line.end.z = 0;
        const param = _line.closestPointToPointParameter(_ssOrigin3, true);
        _line.at(param, _closestPoint);
        const zPos = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(_start4.z, _end4.z, param);
        const isInClipSpace = zPos >= -1 && zPos <= 1;
        const isInside = _ssOrigin3.distanceTo(_closestPoint) < _lineWidth * 0.5;
        if (isInClipSpace && isInside) {
            _line.start.fromBufferAttribute(instanceStart, i);
            _line.end.fromBufferAttribute(instanceEnd, i);
            _line.start.applyMatrix4(matrixWorld);
            _line.end.applyMatrix4(matrixWorld);
            const pointOnLine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            _ray.distanceSqToSegment(_line.start, _line.end, point, pointOnLine);
            intersects.push({
                point,
                pointOnLine,
                distance: _ray.origin.distanceTo(point),
                object: lineSegments,
                face: null,
                faceIndex: i,
                uv: null,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UV1"]]: null
            });
        }
    }
}
class LineSegments2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegmentsGeometry"](), material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineMaterial"]({
        color: Math.random() * 16777215
    })){
        super(geometry, material);
        this.isLineSegments2 = true;
        this.type = "LineSegments2";
    }
    // for backwards-compatibility, but could be a method of LineSegmentsGeometry...
    computeLineDistances() {
        const geometry = this.geometry;
        const instanceStart = geometry.attributes.instanceStart;
        const instanceEnd = geometry.attributes.instanceEnd;
        const lineDistances = new Float32Array(2 * instanceStart.count);
        for(let i = 0, j = 0, l = instanceStart.count; i < l; i++, j += 2){
            _start.fromBufferAttribute(instanceStart, i);
            _end.fromBufferAttribute(instanceEnd, i);
            lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
            lineDistances[j + 1] = lineDistances[j] + _start.distanceTo(_end);
        }
        const instanceDistanceBuffer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedInterleavedBuffer"](lineDistances, 2, 1);
        geometry.setAttribute("instanceDistanceStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceDistanceBuffer, 1, 0));
        geometry.setAttribute("instanceDistanceEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InterleavedBufferAttribute"](instanceDistanceBuffer, 1, 1));
        return this;
    }
    raycast(raycaster, intersects) {
        const worldUnits = this.material.worldUnits;
        const camera = raycaster.camera;
        if (camera === null && !worldUnits) {
            console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
        }
        const threshold = raycaster.params.Line2 !== void 0 ? raycaster.params.Line2.threshold || 0 : 0;
        _ray = raycaster.ray;
        const matrixWorld = this.matrixWorld;
        const geometry = this.geometry;
        const material = this.material;
        _lineWidth = material.linewidth + threshold;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        _sphere.copy(geometry.boundingSphere).applyMatrix4(matrixWorld);
        let sphereMargin;
        if (worldUnits) {
            sphereMargin = _lineWidth * 0.5;
        } else {
            const distanceToSphere = Math.max(camera.near, _sphere.distanceToPoint(_ray.origin));
            sphereMargin = getWorldSpaceHalfWidth(camera, distanceToSphere, material.resolution);
        }
        _sphere.radius += sphereMargin;
        if (_ray.intersectsSphere(_sphere) === false) {
            return;
        }
        if (geometry.boundingBox === null) {
            geometry.computeBoundingBox();
        }
        _box.copy(geometry.boundingBox).applyMatrix4(matrixWorld);
        let boxMargin;
        if (worldUnits) {
            boxMargin = _lineWidth * 0.5;
        } else {
            const distanceToBox = Math.max(camera.near, _box.distanceToPoint(_ray.origin));
            boxMargin = getWorldSpaceHalfWidth(camera, distanceToBox, material.resolution);
        }
        _box.expandByScalar(boxMargin);
        if (_ray.intersectsBox(_box) === false) {
            return;
        }
        if (worldUnits) {
            raycastWorldUnits(this, intersects);
        } else {
            raycastScreenSpace(this, camera, intersects);
        }
    }
    onBeforeRender(renderer) {
        const uniforms = this.material.uniforms;
        if (uniforms && uniforms.resolution) {
            renderer.getViewport(_viewport);
            this.material.uniforms.resolution.value.set(_viewport.z, _viewport.w);
        }
    }
}
;
 //# sourceMappingURL=LineSegments2.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LineGeometry",
    ()=>LineGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineSegmentsGeometry.js [app-client] (ecmascript)");
;
class LineGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegmentsGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegmentsGeometry"] {
    constructor(){
        super();
        this.isLineGeometry = true;
        this.type = "LineGeometry";
    }
    setPositions(array) {
        const length = array.length - 3;
        const points = new Float32Array(2 * length);
        for(let i = 0; i < length; i += 3){
            points[2 * i] = array[i];
            points[2 * i + 1] = array[i + 1];
            points[2 * i + 2] = array[i + 2];
            points[2 * i + 3] = array[i + 3];
            points[2 * i + 4] = array[i + 4];
            points[2 * i + 5] = array[i + 5];
        }
        super.setPositions(points);
        return this;
    }
    setColors(array, itemSize = 3) {
        const length = array.length - itemSize;
        const colors = new Float32Array(2 * length);
        if (itemSize === 3) {
            for(let i = 0; i < length; i += itemSize){
                colors[2 * i] = array[i];
                colors[2 * i + 1] = array[i + 1];
                colors[2 * i + 2] = array[i + 2];
                colors[2 * i + 3] = array[i + 3];
                colors[2 * i + 4] = array[i + 4];
                colors[2 * i + 5] = array[i + 5];
            }
        } else {
            for(let i = 0; i < length; i += itemSize){
                colors[2 * i] = array[i];
                colors[2 * i + 1] = array[i + 1];
                colors[2 * i + 2] = array[i + 2];
                colors[2 * i + 3] = array[i + 3];
                colors[2 * i + 4] = array[i + 4];
                colors[2 * i + 5] = array[i + 5];
                colors[2 * i + 6] = array[i + 6];
                colors[2 * i + 7] = array[i + 7];
            }
        }
        super.setColors(colors, itemSize);
        return this;
    }
    fromLine(line) {
        const geometry = line.geometry;
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
}
;
 //# sourceMappingURL=LineGeometry.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/Line2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Line2",
    ()=>Line2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegments2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineSegments2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineGeometry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/lines/LineMaterial.js [app-client] (ecmascript)");
;
;
;
class Line2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineSegments2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineSegments2"] {
    constructor(geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineGeometry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineGeometry"](), material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$lines$2f$LineMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineMaterial"]({
        color: Math.random() * 16777215
    })){
        super(geometry, material);
        this.isLine2 = true;
        this.type = "Line2";
    }
}
;
 //# sourceMappingURL=Line2.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/geometries/TextGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextBufferGeometry",
    ()=>TextGeometry,
    "TextGeometry",
    ()=>TextGeometry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class TextGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtrudeGeometry"] {
    constructor(text, parameters = {}){
        const { bevelEnabled = false, bevelSize = 8, bevelThickness = 10, font, height = 50, size = 100, lineHeight = 1, letterSpacing = 0, ...rest } = parameters;
        if (font === void 0) {
            super();
        } else {
            const shapes = font.generateShapes(text, size, {
                lineHeight,
                letterSpacing
            });
            super(shapes, {
                ...rest,
                bevelEnabled,
                bevelSize,
                bevelThickness,
                depth: height
            });
        }
        this.type = "TextGeometry";
    }
}
;
 //# sourceMappingURL=TextGeometry.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/loaders/FontLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Font",
    ()=>Font,
    "FontLoader",
    ()=>FontLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
class FontLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(this.path);
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, (response)=>{
            if (typeof response !== "string") throw new Error("unsupported data type");
            const json = JSON.parse(response);
            const font = this.parse(json);
            if (onLoad) onLoad(font);
        }, onProgress, onError);
    }
    loadAsync(url, onProgress) {
        return super.loadAsync(url, onProgress);
    }
    parse(json) {
        return new Font(json);
    }
}
class Font {
    constructor(data){
        __publicField(this, "data");
        __publicField(this, "isFont", true);
        __publicField(this, "type", "Font");
        this.data = data;
    }
    generateShapes(text, size = 100, _options) {
        const shapes = [];
        const options = {
            letterSpacing: 0,
            lineHeight: 1,
            ..._options
        };
        const paths = createPaths(text, size, this.data, options);
        for(let p = 0, pl = paths.length; p < pl; p++){
            Array.prototype.push.apply(shapes, paths[p].toShapes(false));
        }
        return shapes;
    }
}
function createPaths(text, size, data, options) {
    const chars = Array.from(text);
    const scale = size / data.resolution;
    const line_height = (data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness) * scale;
    const paths = [];
    let offsetX = 0, offsetY = 0;
    for(let i = 0; i < chars.length; i++){
        const char = chars[i];
        if (char === "\n") {
            offsetX = 0;
            offsetY -= line_height * options.lineHeight;
        } else {
            const ret = createPath(char, scale, offsetX, offsetY, data);
            if (ret) {
                offsetX += ret.offsetX + options.letterSpacing;
                paths.push(ret.path);
            }
        }
    }
    return paths;
}
function createPath(char, scale, offsetX, offsetY, data) {
    const glyph = data.glyphs[char] || data.glyphs["?"];
    if (!glyph) {
        console.error('THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + ".");
        return;
    }
    const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
    let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;
    if (glyph.o) {
        const outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(" "));
        for(let i = 0, l = outline.length; i < l;){
            const action = outline[i++];
            switch(action){
                case "m":
                    x = parseInt(outline[i++]) * scale + offsetX;
                    y = parseInt(outline[i++]) * scale + offsetY;
                    path.moveTo(x, y);
                    break;
                case "l":
                    x = parseInt(outline[i++]) * scale + offsetX;
                    y = parseInt(outline[i++]) * scale + offsetY;
                    path.lineTo(x, y);
                    break;
                case "q":
                    cpx = parseInt(outline[i++]) * scale + offsetX;
                    cpy = parseInt(outline[i++]) * scale + offsetY;
                    cpx1 = parseInt(outline[i++]) * scale + offsetX;
                    cpy1 = parseInt(outline[i++]) * scale + offsetY;
                    path.quadraticCurveTo(cpx1, cpy1, cpx, cpy);
                    break;
                case "b":
                    cpx = parseInt(outline[i++]) * scale + offsetX;
                    cpy = parseInt(outline[i++]) * scale + offsetY;
                    cpx1 = parseInt(outline[i++]) * scale + offsetX;
                    cpy1 = parseInt(outline[i++]) * scale + offsetY;
                    cpx2 = parseInt(outline[i++]) * scale + offsetX;
                    cpy2 = parseInt(outline[i++]) * scale + offsetY;
                    path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, cpx, cpy);
                    break;
            }
        }
    }
    return {
        offsetX: glyph.ha * scale,
        path
    };
}
;
 //# sourceMappingURL=FontLoader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/shaders/CopyShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyShader",
    ()=>CopyShader
]);
const CopyShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        opacity: {
            value: 1
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `
    uniform float opacity;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );
    	gl_FragColor = opacity * texel;

    }
  `
};
;
 //# sourceMappingURL=CopyShader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FullScreenQuad",
    ()=>FullScreenQuad,
    "Pass",
    ()=>Pass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
class Pass {
    constructor(){
        // if set to true, the pass is processed by the composer
        __publicField(this, "enabled", true);
        // if set to true, the pass indicates to swap read and write buffer after rendering
        __publicField(this, "needsSwap", true);
        // if set to true, the pass clears its buffer before rendering
        __publicField(this, "clear", false);
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        __publicField(this, "renderToScreen", false);
    }
    setSize(width, height) {}
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    dispose() {}
}
class FullScreenQuad {
    constructor(material){
        __publicField(this, "camera", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-1, 1, 1, -1, 0, 1));
        __publicField(this, "geometry", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](2, 2));
        __publicField(this, "mesh");
        this.mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](this.geometry, material);
    }
    get material() {
        return this.mesh.material;
    }
    set material(value) {
        this.mesh.material = value;
    }
    dispose() {
        this.mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this.mesh, this.camera);
    }
}
;
 //# sourceMappingURL=Pass.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShaderPass",
    ()=>ShaderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class ShaderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(shader, textureID = "tDiffuse"){
        super();
        __publicField(this, "textureID");
        __publicField(this, "uniforms");
        __publicField(this, "material");
        __publicField(this, "fsQuad");
        this.textureID = textureID;
        if (shader instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        } else {
            this.uniforms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(shader.uniforms);
            this.material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        this.fsQuad = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullScreenQuad"](this.material);
    }
    render(renderer, writeBuffer, readBuffer) {
        if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture;
        }
        this.fsQuad.material = this.material;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this.fsQuad.render(renderer);
        }
    }
    dispose() {
        this.fsQuad.dispose();
        this.material.dispose();
    }
}
;
 //# sourceMappingURL=ShaderPass.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/MaskPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClearMaskPass",
    ()=>ClearMaskPass,
    "MaskPass",
    ()=>MaskPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
class MaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(scene, camera){
        super();
        __publicField(this, "scene");
        __publicField(this, "camera");
        __publicField(this, "inverse");
        this.scene = scene;
        this.camera = camera;
        this.clear = true;
        this.needsSwap = false;
        this.inverse = false;
    }
    render(renderer, writeBuffer, readBuffer) {
        const context = renderer.getContext();
        const state = renderer.state;
        state.buffers.color.setMask(false);
        state.buffers.depth.setMask(false);
        state.buffers.color.setLocked(true);
        state.buffers.depth.setLocked(true);
        let writeValue, clearValue;
        if (this.inverse) {
            writeValue = 0;
            clearValue = 1;
        } else {
            writeValue = 1;
            clearValue = 0;
        }
        state.buffers.stencil.setTest(true);
        state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
        state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
        state.buffers.stencil.setClear(clearValue);
        state.buffers.stencil.setLocked(true);
        renderer.setRenderTarget(readBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        state.buffers.color.setLocked(false);
        state.buffers.depth.setLocked(false);
        state.buffers.stencil.setLocked(false);
        state.buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
        state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
        state.buffers.stencil.setLocked(true);
    }
}
class ClearMaskPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(){
        super();
        this.needsSwap = false;
    }
    render(renderer) {
        renderer.state.buffers.stencil.setLocked(false);
        renderer.state.buffers.stencil.setTest(false);
    }
}
;
 //# sourceMappingURL=MaskPass.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/EffectComposer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EffectComposer",
    ()=>EffectComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/shaders/CopyShader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/ShaderPass.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/MaskPass.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
;
;
class EffectComposer {
    constructor(renderer, renderTarget){
        __publicField(this, "renderer");
        __publicField(this, "_pixelRatio");
        __publicField(this, "_width");
        __publicField(this, "_height");
        __publicField(this, "renderTarget1");
        __publicField(this, "renderTarget2");
        __publicField(this, "writeBuffer");
        __publicField(this, "readBuffer");
        __publicField(this, "renderToScreen");
        __publicField(this, "passes", []);
        __publicField(this, "copyPass");
        __publicField(this, "clock");
        this.renderer = renderer;
        if (renderTarget === void 0) {
            const parameters = {
                minFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
                magFilter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"],
                format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"]
            };
            const size = renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._pixelRatio = renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
            renderTarget.texture.name = "EffectComposer.rt1";
        } else {
            this._pixelRatio = 1;
            this._width = renderTarget.width;
            this._height = renderTarget.height;
        }
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = "EffectComposer.rt2";
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
        this.renderToScreen = true;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"] === void 0) {
            console.error("THREE.EffectComposer relies on CopyShader");
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"] === void 0) {
            console.error("THREE.EffectComposer relies on ShaderPass");
        }
        this.copyPass = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$ShaderPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderPass"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$shaders$2f$CopyShader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CopyShader"]);
        this.copyPass.material.blending = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoBlending"];
        this.clock = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]();
    }
    swapBuffers() {
        const tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }
    addPass(pass) {
        this.passes.push(pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    insertPass(pass, index) {
        this.passes.splice(index, 0, pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    removePass(pass) {
        const index = this.passes.indexOf(pass);
        if (index !== -1) {
            this.passes.splice(index, 1);
        }
    }
    isLastEnabledPass(passIndex) {
        for(let i = passIndex + 1; i < this.passes.length; i++){
            if (this.passes[i].enabled) {
                return false;
            }
        }
        return true;
    }
    render(deltaTime) {
        if (deltaTime === void 0) {
            deltaTime = this.clock.getDelta();
        }
        const currentRenderTarget = this.renderer.getRenderTarget();
        let maskActive = false;
        const il = this.passes.length;
        for(let i = 0; i < il; i++){
            const pass = this.passes[i];
            if (pass.enabled === false) continue;
            pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
            pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
            if (pass.needsSwap) {
                if (maskActive) {
                    const context = this.renderer.getContext();
                    const stencil = this.renderer.state.buffers.stencil;
                    stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
                    stencil.setFunc(context.EQUAL, 1, 4294967295);
                }
                this.swapBuffers();
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"] !== void 0) {
                if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MaskPass"]) {
                    maskActive = true;
                } else if (pass instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$MaskPass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClearMaskPass"]) {
                    maskActive = false;
                }
            }
        }
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    reset(renderTarget) {
        if (renderTarget === void 0) {
            const size = this.renderer.getSize(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
            this._pixelRatio = this.renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = this.renderTarget1.clone();
            renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
    }
    setSize(width, height) {
        this._width = width;
        this._height = height;
        const effectiveWidth = this._width * this._pixelRatio;
        const effectiveHeight = this._height * this._pixelRatio;
        this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
        this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
        for(let i = 0; i < this.passes.length; i++){
            this.passes[i].setSize(effectiveWidth, effectiveHeight);
        }
    }
    setPixelRatio(pixelRatio) {
        this._pixelRatio = pixelRatio;
        this.setSize(this._width, this._height);
    }
    dispose() {
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.copyPass.dispose();
    }
}
;
 //# sourceMappingURL=EffectComposer.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/RenderPass.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenderPass",
    ()=>RenderPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/postprocessing/Pass.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class RenderPass extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$postprocessing$2f$Pass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pass"] {
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha = 0){
        super();
        __publicField(this, "scene");
        __publicField(this, "camera");
        __publicField(this, "overrideMaterial");
        __publicField(this, "clearColor");
        __publicField(this, "clearAlpha");
        __publicField(this, "clearDepth", false);
        __publicField(this, "_oldClearColor", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]());
        this.scene = scene;
        this.camera = camera;
        this.overrideMaterial = overrideMaterial;
        this.clearColor = clearColor;
        this.clearAlpha = clearAlpha;
        this.clear = true;
        this.needsSwap = false;
    }
    render(renderer, writeBuffer, readBuffer) {
        let oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        let oldClearAlpha;
        let oldOverrideMaterial = null;
        if (this.overrideMaterial !== void 0) {
            oldOverrideMaterial = this.scene.overrideMaterial;
            this.scene.overrideMaterial = this.overrideMaterial;
        }
        if (this.clearColor) {
            renderer.getClearColor(this._oldClearColor);
            oldClearAlpha = renderer.getClearAlpha();
            renderer.setClearColor(this.clearColor, this.clearAlpha);
        }
        if (this.clearDepth) {
            renderer.clearDepth();
        }
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        renderer.render(this.scene, this.camera);
        if (this.clearColor) {
            renderer.setClearColor(this._oldClearColor, oldClearAlpha);
        }
        if (this.overrideMaterial !== void 0) {
            this.scene.overrideMaterial = oldOverrideMaterial;
        }
        renderer.autoClear = oldAutoClear;
    }
}
;
 //# sourceMappingURL=RenderPass.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/shaders/GammaCorrectionShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GammaCorrectionShader",
    ()=>GammaCorrectionShader
]);
const GammaCorrectionShader = {
    uniforms: {
        tDiffuse: {
            value: null
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 tex = texture2D( tDiffuse, vUv );

    	#ifdef LinearTosRGB
    		gl_FragColor = LinearTosRGB( tex );
    	#else
    		gl_FragColor = sRGBTransferOETF( tex );
    	#endif

    }
  `
};
;
 //# sourceMappingURL=GammaCorrectionShader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/math/MeshSurfaceSampler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MeshSurfaceSampler",
    ()=>MeshSurfaceSampler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const _face = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Triangle"]();
const _color = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class MeshSurfaceSampler {
    constructor(mesh){
        let geometry = mesh.geometry;
        if (geometry.index) {
            console.warn("THREE.MeshSurfaceSampler: Converting geometry to non-indexed BufferGeometry.");
            geometry = geometry.toNonIndexed();
        }
        this.geometry = geometry;
        this.randomFunction = Math.random;
        this.positionAttribute = this.geometry.getAttribute("position");
        this.colorAttribute = this.geometry.getAttribute("color");
        this.weightAttribute = null;
        this.distribution = null;
    }
    setWeightAttribute(name) {
        this.weightAttribute = name ? this.geometry.getAttribute(name) : null;
        return this;
    }
    build() {
        const positionAttribute = this.positionAttribute;
        const weightAttribute = this.weightAttribute;
        const faceWeights = new Float32Array(positionAttribute.count / 3);
        for(let i = 0; i < positionAttribute.count; i += 3){
            let faceWeight = 1;
            if (weightAttribute) {
                faceWeight = weightAttribute.getX(i) + weightAttribute.getX(i + 1) + weightAttribute.getX(i + 2);
            }
            _face.a.fromBufferAttribute(positionAttribute, i);
            _face.b.fromBufferAttribute(positionAttribute, i + 1);
            _face.c.fromBufferAttribute(positionAttribute, i + 2);
            faceWeight *= _face.getArea();
            faceWeights[i / 3] = faceWeight;
        }
        this.distribution = new Float32Array(positionAttribute.count / 3);
        let cumulativeTotal = 0;
        for(let i = 0; i < faceWeights.length; i++){
            cumulativeTotal += faceWeights[i];
            this.distribution[i] = cumulativeTotal;
        }
        return this;
    }
    setRandomGenerator(randomFunction) {
        this.randomFunction = randomFunction;
        return this;
    }
    sample(targetPosition, targetNormal, targetColor) {
        const faceIndex = this.sampleFaceIndex();
        return this.sampleFace(faceIndex, targetPosition, targetNormal, targetColor);
    }
    sampleFaceIndex() {
        const cumulativeTotal = this.distribution[this.distribution.length - 1];
        return this.binarySearch(this.randomFunction() * cumulativeTotal);
    }
    binarySearch(x) {
        const dist = this.distribution;
        let start = 0;
        let end = dist.length - 1;
        let index = -1;
        while(start <= end){
            const mid = Math.ceil((start + end) / 2);
            if (mid === 0 || dist[mid - 1] <= x && dist[mid] > x) {
                index = mid;
                break;
            } else if (x < dist[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return index;
    }
    sampleFace(faceIndex, targetPosition, targetNormal, targetColor) {
        let u = this.randomFunction();
        let v = this.randomFunction();
        if (u + v > 1) {
            u = 1 - u;
            v = 1 - v;
        }
        _face.a.fromBufferAttribute(this.positionAttribute, faceIndex * 3);
        _face.b.fromBufferAttribute(this.positionAttribute, faceIndex * 3 + 1);
        _face.c.fromBufferAttribute(this.positionAttribute, faceIndex * 3 + 2);
        targetPosition.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
        if (targetNormal !== void 0) {
            _face.getNormal(targetNormal);
        }
        if (targetColor !== void 0 && this.colorAttribute !== void 0) {
            _face.a.fromBufferAttribute(this.colorAttribute, faceIndex * 3);
            _face.b.fromBufferAttribute(this.colorAttribute, faceIndex * 3 + 1);
            _face.c.fromBufferAttribute(this.colorAttribute, faceIndex * 3 + 2);
            _color.set(0, 0, 0).addScaledVector(_face.a, u).addScaledVector(_face.b, v).addScaledVector(_face.c, 1 - (u + v));
            targetColor.r = _color.x;
            targetColor.g = _color.y;
            targetColor.b = _color.z;
        }
        return this;
    }
}
;
 //# sourceMappingURL=MeshSurfaceSampler.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/objects/MarchingCubes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarchingCubes",
    ()=>MarchingCubes,
    "edgeTable",
    ()=>edgeTable,
    "triTable",
    ()=>triTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class MarchingCubes extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(resolution, material, enableUvs = false, enableColors = false, maxPolyCount = 1e4){
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        super(geometry, material);
        this.isMarchingCubes = true;
        const scope = this;
        const vlist = new Float32Array(12 * 3);
        const nlist = new Float32Array(12 * 3);
        const clist = new Float32Array(12 * 3);
        this.enableUvs = enableUvs;
        this.enableColors = enableColors;
        this.init = function(resolution2) {
            this.resolution = resolution2;
            this.isolation = 80;
            this.size = resolution2;
            this.size2 = this.size * this.size;
            this.size3 = this.size2 * this.size;
            this.halfsize = this.size / 2;
            this.delta = 2 / this.size;
            this.yd = this.size;
            this.zd = this.size2;
            this.field = new Float32Array(this.size3);
            this.normal_cache = new Float32Array(this.size3 * 3);
            this.palette = new Float32Array(this.size3 * 3);
            this.count = 0;
            const maxVertexCount = maxPolyCount * 3;
            this.positionArray = new Float32Array(maxVertexCount * 3);
            const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.positionArray, 3);
            positionAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            geometry.setAttribute("position", positionAttribute);
            this.normalArray = new Float32Array(maxVertexCount * 3);
            const normalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.normalArray, 3);
            normalAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
            geometry.setAttribute("normal", normalAttribute);
            if (this.enableUvs) {
                this.uvArray = new Float32Array(maxVertexCount * 2);
                const uvAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.uvArray, 2);
                uvAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
                geometry.setAttribute("uv", uvAttribute);
            }
            if (this.enableColors) {
                this.colorArray = new Float32Array(maxVertexCount * 3);
                const colorAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](this.colorArray, 3);
                colorAttribute.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
                geometry.setAttribute("color", colorAttribute);
            }
            geometry.boundingSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](), 1);
        };
        function lerp(a, b, t) {
            return a + (b - a) * t;
        }
        function VIntX(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x + mu * scope.delta;
            vlist[offset + 1] = y;
            vlist[offset + 2] = z;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q + 3], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q + 4], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q + 5], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function VIntY(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x;
            vlist[offset + 1] = y + mu * scope.delta;
            vlist[offset + 2] = z;
            const q2 = q + scope.yd * 3;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function VIntZ(q, offset, isol, x, y, z, valp1, valp2, c_offset1, c_offset2) {
            const mu = (isol - valp1) / (valp2 - valp1), nc = scope.normal_cache;
            vlist[offset + 0] = x;
            vlist[offset + 1] = y;
            vlist[offset + 2] = z + mu * scope.delta;
            const q2 = q + scope.zd * 3;
            nlist[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu);
            nlist[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu);
            nlist[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu);
            clist[offset + 0] = lerp(scope.palette[c_offset1 * 3 + 0], scope.palette[c_offset2 * 3 + 0], mu);
            clist[offset + 1] = lerp(scope.palette[c_offset1 * 3 + 1], scope.palette[c_offset2 * 3 + 1], mu);
            clist[offset + 2] = lerp(scope.palette[c_offset1 * 3 + 2], scope.palette[c_offset2 * 3 + 2], mu);
        }
        function compNorm(q) {
            const q3 = q * 3;
            if (scope.normal_cache[q3] === 0) {
                scope.normal_cache[q3 + 0] = scope.field[q - 1] - scope.field[q + 1];
                scope.normal_cache[q3 + 1] = scope.field[q - scope.yd] - scope.field[q + scope.yd];
                scope.normal_cache[q3 + 2] = scope.field[q - scope.zd] - scope.field[q + scope.zd];
            }
        }
        function polygonize(fx, fy, fz, q, isol) {
            const q1 = q + 1, qy = q + scope.yd, qz = q + scope.zd, q1y = q1 + scope.yd, q1z = q1 + scope.zd, qyz = q + scope.yd + scope.zd, q1yz = q1 + scope.yd + scope.zd;
            let cubeindex = 0;
            const field0 = scope.field[q], field1 = scope.field[q1], field2 = scope.field[qy], field3 = scope.field[q1y], field4 = scope.field[qz], field5 = scope.field[q1z], field6 = scope.field[qyz], field7 = scope.field[q1yz];
            if (field0 < isol) cubeindex |= 1;
            if (field1 < isol) cubeindex |= 2;
            if (field2 < isol) cubeindex |= 8;
            if (field3 < isol) cubeindex |= 4;
            if (field4 < isol) cubeindex |= 16;
            if (field5 < isol) cubeindex |= 32;
            if (field6 < isol) cubeindex |= 128;
            if (field7 < isol) cubeindex |= 64;
            const bits = edgeTable[cubeindex];
            if (bits === 0) return 0;
            const d = scope.delta, fx2 = fx + d, fy2 = fy + d, fz2 = fz + d;
            if (bits & 1) {
                compNorm(q);
                compNorm(q1);
                VIntX(q * 3, 0, isol, fx, fy, fz, field0, field1, q, q1);
            }
            if (bits & 2) {
                compNorm(q1);
                compNorm(q1y);
                VIntY(q1 * 3, 3, isol, fx2, fy, fz, field1, field3, q1, q1y);
            }
            if (bits & 4) {
                compNorm(qy);
                compNorm(q1y);
                VIntX(qy * 3, 6, isol, fx, fy2, fz, field2, field3, qy, q1y);
            }
            if (bits & 8) {
                compNorm(q);
                compNorm(qy);
                VIntY(q * 3, 9, isol, fx, fy, fz, field0, field2, q, qy);
            }
            if (bits & 16) {
                compNorm(qz);
                compNorm(q1z);
                VIntX(qz * 3, 12, isol, fx, fy, fz2, field4, field5, qz, q1z);
            }
            if (bits & 32) {
                compNorm(q1z);
                compNorm(q1yz);
                VIntY(q1z * 3, 15, isol, fx2, fy, fz2, field5, field7, q1z, q1yz);
            }
            if (bits & 64) {
                compNorm(qyz);
                compNorm(q1yz);
                VIntX(qyz * 3, 18, isol, fx, fy2, fz2, field6, field7, qyz, q1yz);
            }
            if (bits & 128) {
                compNorm(qz);
                compNorm(qyz);
                VIntY(qz * 3, 21, isol, fx, fy, fz2, field4, field6, qz, qyz);
            }
            if (bits & 256) {
                compNorm(q);
                compNorm(qz);
                VIntZ(q * 3, 24, isol, fx, fy, fz, field0, field4, q, qz);
            }
            if (bits & 512) {
                compNorm(q1);
                compNorm(q1z);
                VIntZ(q1 * 3, 27, isol, fx2, fy, fz, field1, field5, q1, q1z);
            }
            if (bits & 1024) {
                compNorm(q1y);
                compNorm(q1yz);
                VIntZ(q1y * 3, 30, isol, fx2, fy2, fz, field3, field7, q1y, q1yz);
            }
            if (bits & 2048) {
                compNorm(qy);
                compNorm(qyz);
                VIntZ(qy * 3, 33, isol, fx, fy2, fz, field2, field6, qy, qyz);
            }
            cubeindex <<= 4;
            let o1, o2, o3, numtris = 0, i = 0;
            while(triTable[cubeindex + i] != -1){
                o1 = cubeindex + i;
                o2 = o1 + 1;
                o3 = o1 + 2;
                posnormtriv(vlist, nlist, clist, 3 * triTable[o1], 3 * triTable[o2], 3 * triTable[o3]);
                i += 3;
                numtris++;
            }
            return numtris;
        }
        function posnormtriv(pos, norm, colors, o1, o2, o3) {
            const c = scope.count * 3;
            scope.positionArray[c + 0] = pos[o1];
            scope.positionArray[c + 1] = pos[o1 + 1];
            scope.positionArray[c + 2] = pos[o1 + 2];
            scope.positionArray[c + 3] = pos[o2];
            scope.positionArray[c + 4] = pos[o2 + 1];
            scope.positionArray[c + 5] = pos[o2 + 2];
            scope.positionArray[c + 6] = pos[o3];
            scope.positionArray[c + 7] = pos[o3 + 1];
            scope.positionArray[c + 8] = pos[o3 + 2];
            if (scope.material.flatShading === true) {
                const nx = (norm[o1 + 0] + norm[o2 + 0] + norm[o3 + 0]) / 3;
                const ny = (norm[o1 + 1] + norm[o2 + 1] + norm[o3 + 1]) / 3;
                const nz = (norm[o1 + 2] + norm[o2 + 2] + norm[o3 + 2]) / 3;
                scope.normalArray[c + 0] = nx;
                scope.normalArray[c + 1] = ny;
                scope.normalArray[c + 2] = nz;
                scope.normalArray[c + 3] = nx;
                scope.normalArray[c + 4] = ny;
                scope.normalArray[c + 5] = nz;
                scope.normalArray[c + 6] = nx;
                scope.normalArray[c + 7] = ny;
                scope.normalArray[c + 8] = nz;
            } else {
                scope.normalArray[c + 0] = norm[o1 + 0];
                scope.normalArray[c + 1] = norm[o1 + 1];
                scope.normalArray[c + 2] = norm[o1 + 2];
                scope.normalArray[c + 3] = norm[o2 + 0];
                scope.normalArray[c + 4] = norm[o2 + 1];
                scope.normalArray[c + 5] = norm[o2 + 2];
                scope.normalArray[c + 6] = norm[o3 + 0];
                scope.normalArray[c + 7] = norm[o3 + 1];
                scope.normalArray[c + 8] = norm[o3 + 2];
            }
            if (scope.enableUvs) {
                const d = scope.count * 2;
                scope.uvArray[d + 0] = pos[o1 + 0];
                scope.uvArray[d + 1] = pos[o1 + 2];
                scope.uvArray[d + 2] = pos[o2 + 0];
                scope.uvArray[d + 3] = pos[o2 + 2];
                scope.uvArray[d + 4] = pos[o3 + 0];
                scope.uvArray[d + 5] = pos[o3 + 2];
            }
            if (scope.enableColors) {
                scope.colorArray[c + 0] = colors[o1 + 0];
                scope.colorArray[c + 1] = colors[o1 + 1];
                scope.colorArray[c + 2] = colors[o1 + 2];
                scope.colorArray[c + 3] = colors[o2 + 0];
                scope.colorArray[c + 4] = colors[o2 + 1];
                scope.colorArray[c + 5] = colors[o2 + 2];
                scope.colorArray[c + 6] = colors[o3 + 0];
                scope.colorArray[c + 7] = colors[o3 + 1];
                scope.colorArray[c + 8] = colors[o3 + 2];
            }
            scope.count += 3;
        }
        this.addBall = function(ballx, bally, ballz, strength, subtract, colors) {
            const sign = Math.sign(strength);
            strength = Math.abs(strength);
            const userDefineColor = !(colors === void 0 || colors === null);
            let ballColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](ballx, bally, ballz);
            if (userDefineColor) {
                try {
                    ballColor = colors instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"] ? colors : Array.isArray(colors) ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](Math.min(Math.abs(colors[0]), 1), Math.min(Math.abs(colors[1]), 1), Math.min(Math.abs(colors[2]), 1)) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](colors);
                } catch (err) {
                    ballColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](ballx, bally, ballz);
                }
            }
            const radius = this.size * Math.sqrt(strength / subtract), zs = ballz * this.size, ys = bally * this.size, xs = ballx * this.size;
            let min_z = Math.floor(zs - radius);
            if (min_z < 1) min_z = 1;
            let max_z = Math.floor(zs + radius);
            if (max_z > this.size - 1) max_z = this.size - 1;
            let min_y = Math.floor(ys - radius);
            if (min_y < 1) min_y = 1;
            let max_y = Math.floor(ys + radius);
            if (max_y > this.size - 1) max_y = this.size - 1;
            let min_x = Math.floor(xs - radius);
            if (min_x < 1) min_x = 1;
            let max_x = Math.floor(xs + radius);
            if (max_x > this.size - 1) max_x = this.size - 1;
            let x, y, z, y_offset, z_offset, fx, fy, fz, fz2, fy2, val;
            for(z = min_z; z < max_z; z++){
                z_offset = this.size2 * z;
                fz = z / this.size - ballz;
                fz2 = fz * fz;
                for(y = min_y; y < max_y; y++){
                    y_offset = z_offset + this.size * y;
                    fy = y / this.size - bally;
                    fy2 = fy * fy;
                    for(x = min_x; x < max_x; x++){
                        fx = x / this.size - ballx;
                        val = strength / (1e-6 + fx * fx + fy2 + fz2) - subtract;
                        if (val > 0) {
                            this.field[y_offset + x] += val * sign;
                            const ratio = Math.sqrt((x - xs) * (x - xs) + (y - ys) * (y - ys) + (z - zs) * (z - zs)) / radius;
                            const contrib = 1 - ratio * ratio * ratio * (ratio * (ratio * 6 - 15) + 10);
                            this.palette[(y_offset + x) * 3 + 0] += ballColor.r * contrib;
                            this.palette[(y_offset + x) * 3 + 1] += ballColor.g * contrib;
                            this.palette[(y_offset + x) * 3 + 2] += ballColor.b * contrib;
                        }
                    }
                }
            }
        };
        this.addPlaneX = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, xx, val, xdiv, cxy, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(x = 0; x < dist; x++){
                xdiv = x / size;
                xx = xdiv * xdiv;
                val = strength / (1e-4 + xx) - subtract;
                if (val > 0) {
                    for(y = 0; y < size; y++){
                        cxy = x + y * yd;
                        for(z = 0; z < size; z++){
                            field[zd * z + cxy] += val;
                        }
                    }
                }
            }
        };
        this.addPlaneY = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, yy, val, ydiv, cy, cxy, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(y = 0; y < dist; y++){
                ydiv = y / size;
                yy = ydiv * ydiv;
                val = strength / (1e-4 + yy) - subtract;
                if (val > 0) {
                    cy = y * yd;
                    for(x = 0; x < size; x++){
                        cxy = cy + x;
                        for(z = 0; z < size; z++)field[zd * z + cxy] += val;
                    }
                }
            }
        };
        this.addPlaneZ = function(strength, subtract) {
            const size = this.size, yd = this.yd, zd = this.zd, field = this.field;
            let x, y, z, zz, val, zdiv, cz, cyz, dist = size * Math.sqrt(strength / subtract);
            if (dist > size) dist = size;
            for(z = 0; z < dist; z++){
                zdiv = z / size;
                zz = zdiv * zdiv;
                val = strength / (1e-4 + zz) - subtract;
                if (val > 0) {
                    cz = zd * z;
                    for(y = 0; y < size; y++){
                        cyz = cz + y * yd;
                        for(x = 0; x < size; x++)field[cyz + x] += val;
                    }
                }
            }
        };
        this.setCell = function(x, y, z, value) {
            const index = this.size2 * z + this.size * y + x;
            this.field[index] = value;
        };
        this.getCell = function(x, y, z) {
            const index = this.size2 * z + this.size * y + x;
            return this.field[index];
        };
        this.blur = function(intensity = 1) {
            const field = this.field;
            const fieldCopy = field.slice();
            const size = this.size;
            const size2 = this.size2;
            for(let x = 0; x < size; x++){
                for(let y = 0; y < size; y++){
                    for(let z = 0; z < size; z++){
                        const index = size2 * z + size * y + x;
                        let val = fieldCopy[index];
                        let count = 1;
                        for(let x2 = -1; x2 <= 1; x2 += 2){
                            const x3 = x2 + x;
                            if (x3 < 0 || x3 >= size) continue;
                            for(let y2 = -1; y2 <= 1; y2 += 2){
                                const y3 = y2 + y;
                                if (y3 < 0 || y3 >= size) continue;
                                for(let z2 = -1; z2 <= 1; z2 += 2){
                                    const z3 = z2 + z;
                                    if (z3 < 0 || z3 >= size) continue;
                                    const index2 = size2 * z3 + size * y3 + x3;
                                    const val2 = fieldCopy[index2];
                                    count++;
                                    val += intensity * (val2 - val) / count;
                                }
                            }
                        }
                        field[index] = val;
                    }
                }
            }
        };
        this.reset = function() {
            for(let i = 0; i < this.size3; i++){
                this.normal_cache[i * 3] = 0;
                this.field[i] = 0;
                this.palette[i * 3] = this.palette[i * 3 + 1] = this.palette[i * 3 + 2] = 0;
            }
        };
        this.update = function() {
            this.count = 0;
            const smin2 = this.size - 2;
            for(let z = 1; z < smin2; z++){
                const z_offset = this.size2 * z;
                const fz = (z - this.halfsize) / this.halfsize;
                for(let y = 1; y < smin2; y++){
                    const y_offset = z_offset + this.size * y;
                    const fy = (y - this.halfsize) / this.halfsize;
                    for(let x = 1; x < smin2; x++){
                        const fx = (x - this.halfsize) / this.halfsize;
                        const q = y_offset + x;
                        polygonize(fx, fy, fz, q, this.isolation);
                    }
                }
            }
            this.geometry.setDrawRange(0, this.count);
            geometry.getAttribute("position").needsUpdate = true;
            geometry.getAttribute("normal").needsUpdate = true;
            if (this.enableUvs) geometry.getAttribute("uv").needsUpdate = true;
            if (this.enableColors) geometry.getAttribute("color").needsUpdate = true;
            if (this.count / 3 > maxPolyCount) console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.");
        };
        this.init(resolution);
    }
}
const edgeTable = new Int32Array([
    0,
    265,
    515,
    778,
    1030,
    1295,
    1541,
    1804,
    2060,
    2309,
    2575,
    2822,
    3082,
    3331,
    3593,
    3840,
    400,
    153,
    915,
    666,
    1430,
    1183,
    1941,
    1692,
    2460,
    2197,
    2975,
    2710,
    3482,
    3219,
    3993,
    3728,
    560,
    825,
    51,
    314,
    1590,
    1855,
    1077,
    1340,
    2620,
    2869,
    2111,
    2358,
    3642,
    3891,
    3129,
    3376,
    928,
    681,
    419,
    170,
    1958,
    1711,
    1445,
    1196,
    2988,
    2725,
    2479,
    2214,
    4010,
    3747,
    3497,
    3232,
    1120,
    1385,
    1635,
    1898,
    102,
    367,
    613,
    876,
    3180,
    3429,
    3695,
    3942,
    2154,
    2403,
    2665,
    2912,
    1520,
    1273,
    2035,
    1786,
    502,
    255,
    1013,
    764,
    3580,
    3317,
    4095,
    3830,
    2554,
    2291,
    3065,
    2800,
    1616,
    1881,
    1107,
    1370,
    598,
    863,
    85,
    348,
    3676,
    3925,
    3167,
    3414,
    2650,
    2899,
    2137,
    2384,
    1984,
    1737,
    1475,
    1226,
    966,
    719,
    453,
    204,
    4044,
    3781,
    3535,
    3270,
    3018,
    2755,
    2505,
    2240,
    2240,
    2505,
    2755,
    3018,
    3270,
    3535,
    3781,
    4044,
    204,
    453,
    719,
    966,
    1226,
    1475,
    1737,
    1984,
    2384,
    2137,
    2899,
    2650,
    3414,
    3167,
    3925,
    3676,
    348,
    85,
    863,
    598,
    1370,
    1107,
    1881,
    1616,
    2800,
    3065,
    2291,
    2554,
    3830,
    4095,
    3317,
    3580,
    764,
    1013,
    255,
    502,
    1786,
    2035,
    1273,
    1520,
    2912,
    2665,
    2403,
    2154,
    3942,
    3695,
    3429,
    3180,
    876,
    613,
    367,
    102,
    1898,
    1635,
    1385,
    1120,
    3232,
    3497,
    3747,
    4010,
    2214,
    2479,
    2725,
    2988,
    1196,
    1445,
    1711,
    1958,
    170,
    419,
    681,
    928,
    3376,
    3129,
    3891,
    3642,
    2358,
    2111,
    2869,
    2620,
    1340,
    1077,
    1855,
    1590,
    314,
    51,
    825,
    560,
    3728,
    3993,
    3219,
    3482,
    2710,
    2975,
    2197,
    2460,
    1692,
    1941,
    1183,
    1430,
    666,
    915,
    153,
    400,
    3840,
    3593,
    3331,
    3082,
    2822,
    2575,
    2309,
    2060,
    1804,
    1541,
    1295,
    1030,
    778,
    515,
    265,
    0
]);
const triTable = new Int32Array([
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    8,
    3,
    9,
    8,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    10,
    0,
    2,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    8,
    3,
    2,
    10,
    8,
    10,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    2,
    8,
    11,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    11,
    2,
    1,
    9,
    11,
    9,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    1,
    11,
    10,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    10,
    1,
    0,
    8,
    10,
    8,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    9,
    0,
    3,
    11,
    9,
    11,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    10,
    10,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    3,
    0,
    7,
    3,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    1,
    9,
    4,
    7,
    1,
    7,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    4,
    7,
    3,
    0,
    4,
    1,
    2,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    10,
    9,
    0,
    2,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    9,
    2,
    9,
    7,
    2,
    7,
    3,
    7,
    9,
    4,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    7,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    4,
    7,
    11,
    2,
    4,
    2,
    0,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    8,
    4,
    7,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    11,
    9,
    4,
    11,
    9,
    11,
    2,
    9,
    2,
    1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    1,
    3,
    11,
    10,
    7,
    8,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    11,
    10,
    1,
    4,
    11,
    1,
    0,
    4,
    7,
    11,
    4,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    8,
    9,
    0,
    11,
    9,
    11,
    10,
    11,
    0,
    3,
    -1,
    -1,
    -1,
    -1,
    4,
    7,
    11,
    4,
    11,
    9,
    9,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    5,
    4,
    1,
    5,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    5,
    4,
    8,
    3,
    5,
    3,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    1,
    2,
    10,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    2,
    10,
    5,
    4,
    2,
    4,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    5,
    3,
    2,
    5,
    3,
    5,
    4,
    3,
    4,
    8,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    2,
    0,
    8,
    11,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    5,
    4,
    0,
    1,
    5,
    2,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    1,
    5,
    2,
    5,
    8,
    2,
    8,
    11,
    4,
    8,
    5,
    -1,
    -1,
    -1,
    -1,
    10,
    3,
    11,
    10,
    1,
    3,
    9,
    5,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    5,
    0,
    8,
    1,
    8,
    10,
    1,
    8,
    11,
    10,
    -1,
    -1,
    -1,
    -1,
    5,
    4,
    0,
    5,
    0,
    11,
    5,
    11,
    10,
    11,
    0,
    3,
    -1,
    -1,
    -1,
    -1,
    5,
    4,
    8,
    5,
    8,
    10,
    10,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    8,
    5,
    7,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    3,
    0,
    9,
    5,
    3,
    5,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    7,
    8,
    0,
    1,
    7,
    1,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    5,
    3,
    3,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    8,
    9,
    5,
    7,
    10,
    1,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    2,
    9,
    5,
    0,
    5,
    3,
    0,
    5,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    8,
    0,
    2,
    8,
    2,
    5,
    8,
    5,
    7,
    10,
    5,
    2,
    -1,
    -1,
    -1,
    -1,
    2,
    10,
    5,
    2,
    5,
    3,
    3,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    9,
    5,
    7,
    8,
    9,
    3,
    11,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    7,
    9,
    7,
    2,
    9,
    2,
    0,
    2,
    7,
    11,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    0,
    1,
    8,
    1,
    7,
    8,
    1,
    5,
    7,
    -1,
    -1,
    -1,
    -1,
    11,
    2,
    1,
    11,
    1,
    7,
    7,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    8,
    8,
    5,
    7,
    10,
    1,
    3,
    10,
    3,
    11,
    -1,
    -1,
    -1,
    -1,
    5,
    7,
    0,
    5,
    0,
    9,
    7,
    11,
    0,
    1,
    0,
    10,
    11,
    10,
    0,
    -1,
    11,
    10,
    0,
    11,
    0,
    3,
    10,
    5,
    0,
    8,
    0,
    7,
    5,
    7,
    0,
    -1,
    11,
    10,
    5,
    7,
    11,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    8,
    3,
    1,
    9,
    8,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    5,
    2,
    6,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    5,
    1,
    2,
    6,
    3,
    0,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    6,
    5,
    9,
    0,
    6,
    0,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    9,
    8,
    5,
    8,
    2,
    5,
    2,
    6,
    3,
    2,
    8,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    0,
    8,
    11,
    2,
    0,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    2,
    3,
    11,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    1,
    9,
    2,
    9,
    11,
    2,
    9,
    8,
    11,
    -1,
    -1,
    -1,
    -1,
    6,
    3,
    11,
    6,
    5,
    3,
    5,
    1,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    11,
    0,
    11,
    5,
    0,
    5,
    1,
    5,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    6,
    0,
    3,
    6,
    0,
    6,
    5,
    0,
    5,
    9,
    -1,
    -1,
    -1,
    -1,
    6,
    5,
    9,
    6,
    9,
    11,
    11,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    3,
    0,
    4,
    7,
    3,
    6,
    5,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    5,
    10,
    6,
    8,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    5,
    1,
    9,
    7,
    1,
    7,
    3,
    7,
    9,
    4,
    -1,
    -1,
    -1,
    -1,
    6,
    1,
    2,
    6,
    5,
    1,
    4,
    7,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    5,
    5,
    2,
    6,
    3,
    0,
    4,
    3,
    4,
    7,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    7,
    9,
    0,
    5,
    0,
    6,
    5,
    0,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    7,
    3,
    9,
    7,
    9,
    4,
    3,
    2,
    9,
    5,
    9,
    6,
    2,
    6,
    9,
    -1,
    3,
    11,
    2,
    7,
    8,
    4,
    10,
    6,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    6,
    4,
    7,
    2,
    4,
    2,
    0,
    2,
    7,
    11,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    4,
    7,
    8,
    2,
    3,
    11,
    5,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    9,
    2,
    1,
    9,
    11,
    2,
    9,
    4,
    11,
    7,
    11,
    4,
    5,
    10,
    6,
    -1,
    8,
    4,
    7,
    3,
    11,
    5,
    3,
    5,
    1,
    5,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    5,
    1,
    11,
    5,
    11,
    6,
    1,
    0,
    11,
    7,
    11,
    4,
    0,
    4,
    11,
    -1,
    0,
    5,
    9,
    0,
    6,
    5,
    0,
    3,
    6,
    11,
    6,
    3,
    8,
    4,
    7,
    -1,
    6,
    5,
    9,
    6,
    9,
    11,
    4,
    7,
    9,
    7,
    11,
    9,
    -1,
    -1,
    -1,
    -1,
    10,
    4,
    9,
    6,
    4,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    10,
    6,
    4,
    9,
    10,
    0,
    8,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    0,
    1,
    10,
    6,
    0,
    6,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    3,
    1,
    8,
    1,
    6,
    8,
    6,
    4,
    6,
    1,
    10,
    -1,
    -1,
    -1,
    -1,
    1,
    4,
    9,
    1,
    2,
    4,
    2,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    1,
    2,
    9,
    2,
    4,
    9,
    2,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    0,
    2,
    4,
    4,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    3,
    2,
    8,
    2,
    4,
    4,
    2,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    4,
    9,
    10,
    6,
    4,
    11,
    2,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    2,
    2,
    8,
    11,
    4,
    9,
    10,
    4,
    10,
    6,
    -1,
    -1,
    -1,
    -1,
    3,
    11,
    2,
    0,
    1,
    6,
    0,
    6,
    4,
    6,
    1,
    10,
    -1,
    -1,
    -1,
    -1,
    6,
    4,
    1,
    6,
    1,
    10,
    4,
    8,
    1,
    2,
    1,
    11,
    8,
    11,
    1,
    -1,
    9,
    6,
    4,
    9,
    3,
    6,
    9,
    1,
    3,
    11,
    6,
    3,
    -1,
    -1,
    -1,
    -1,
    8,
    11,
    1,
    8,
    1,
    0,
    11,
    6,
    1,
    9,
    1,
    4,
    6,
    4,
    1,
    -1,
    3,
    11,
    6,
    3,
    6,
    0,
    0,
    6,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    4,
    8,
    11,
    6,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    10,
    6,
    7,
    8,
    10,
    8,
    9,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    7,
    3,
    0,
    10,
    7,
    0,
    9,
    10,
    6,
    7,
    10,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    7,
    1,
    10,
    7,
    1,
    7,
    8,
    1,
    8,
    0,
    -1,
    -1,
    -1,
    -1,
    10,
    6,
    7,
    10,
    7,
    1,
    1,
    7,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    6,
    1,
    6,
    8,
    1,
    8,
    9,
    8,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    2,
    6,
    9,
    2,
    9,
    1,
    6,
    7,
    9,
    0,
    9,
    3,
    7,
    3,
    9,
    -1,
    7,
    8,
    0,
    7,
    0,
    6,
    6,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    3,
    2,
    6,
    7,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    11,
    10,
    6,
    8,
    10,
    8,
    9,
    8,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    2,
    0,
    7,
    2,
    7,
    11,
    0,
    9,
    7,
    6,
    7,
    10,
    9,
    10,
    7,
    -1,
    1,
    8,
    0,
    1,
    7,
    8,
    1,
    10,
    7,
    6,
    7,
    10,
    2,
    3,
    11,
    -1,
    11,
    2,
    1,
    11,
    1,
    7,
    10,
    6,
    1,
    6,
    7,
    1,
    -1,
    -1,
    -1,
    -1,
    8,
    9,
    6,
    8,
    6,
    7,
    9,
    1,
    6,
    11,
    6,
    3,
    1,
    3,
    6,
    -1,
    0,
    9,
    1,
    11,
    6,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    8,
    0,
    7,
    0,
    6,
    3,
    11,
    0,
    11,
    6,
    0,
    -1,
    -1,
    -1,
    -1,
    7,
    11,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    8,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    1,
    9,
    8,
    3,
    1,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    2,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    3,
    0,
    8,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    9,
    0,
    2,
    10,
    9,
    6,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    7,
    2,
    10,
    3,
    10,
    8,
    3,
    10,
    9,
    8,
    -1,
    -1,
    -1,
    -1,
    7,
    2,
    3,
    6,
    2,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    7,
    0,
    8,
    7,
    6,
    0,
    6,
    2,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    7,
    6,
    2,
    3,
    7,
    0,
    1,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    2,
    1,
    8,
    6,
    1,
    9,
    8,
    8,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    6,
    10,
    1,
    7,
    1,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    6,
    1,
    7,
    10,
    1,
    8,
    7,
    1,
    0,
    8,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    7,
    0,
    7,
    10,
    0,
    10,
    9,
    6,
    10,
    7,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    10,
    7,
    10,
    8,
    8,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    8,
    4,
    11,
    8,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    11,
    3,
    0,
    6,
    0,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    6,
    11,
    8,
    4,
    6,
    9,
    0,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    4,
    6,
    9,
    6,
    3,
    9,
    3,
    1,
    11,
    3,
    6,
    -1,
    -1,
    -1,
    -1,
    6,
    8,
    4,
    6,
    11,
    8,
    2,
    10,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    3,
    0,
    11,
    0,
    6,
    11,
    0,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    4,
    11,
    8,
    4,
    6,
    11,
    0,
    2,
    9,
    2,
    10,
    9,
    -1,
    -1,
    -1,
    -1,
    10,
    9,
    3,
    10,
    3,
    2,
    9,
    4,
    3,
    11,
    3,
    6,
    4,
    6,
    3,
    -1,
    8,
    2,
    3,
    8,
    4,
    2,
    4,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    2,
    4,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    0,
    2,
    3,
    4,
    2,
    4,
    6,
    4,
    3,
    8,
    -1,
    -1,
    -1,
    -1,
    1,
    9,
    4,
    1,
    4,
    2,
    2,
    4,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    1,
    3,
    8,
    6,
    1,
    8,
    4,
    6,
    6,
    10,
    1,
    -1,
    -1,
    -1,
    -1,
    10,
    1,
    0,
    10,
    0,
    6,
    6,
    0,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    6,
    3,
    4,
    3,
    8,
    6,
    10,
    3,
    0,
    3,
    9,
    10,
    9,
    3,
    -1,
    10,
    9,
    4,
    6,
    10,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    5,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    4,
    9,
    5,
    11,
    7,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    0,
    1,
    5,
    4,
    0,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    7,
    6,
    8,
    3,
    4,
    3,
    5,
    4,
    3,
    1,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    10,
    1,
    2,
    7,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    7,
    1,
    2,
    10,
    0,
    8,
    3,
    4,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    7,
    6,
    11,
    5,
    4,
    10,
    4,
    2,
    10,
    4,
    0,
    2,
    -1,
    -1,
    -1,
    -1,
    3,
    4,
    8,
    3,
    5,
    4,
    3,
    2,
    5,
    10,
    5,
    2,
    11,
    7,
    6,
    -1,
    7,
    2,
    3,
    7,
    6,
    2,
    5,
    4,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    4,
    0,
    8,
    6,
    0,
    6,
    2,
    6,
    8,
    7,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    2,
    3,
    7,
    6,
    1,
    5,
    0,
    5,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    6,
    2,
    8,
    6,
    8,
    7,
    2,
    1,
    8,
    4,
    8,
    5,
    1,
    5,
    8,
    -1,
    9,
    5,
    4,
    10,
    1,
    6,
    1,
    7,
    6,
    1,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    1,
    6,
    10,
    1,
    7,
    6,
    1,
    0,
    7,
    8,
    7,
    0,
    9,
    5,
    4,
    -1,
    4,
    0,
    10,
    4,
    10,
    5,
    0,
    3,
    10,
    6,
    10,
    7,
    3,
    7,
    10,
    -1,
    7,
    6,
    10,
    7,
    10,
    8,
    5,
    4,
    10,
    4,
    8,
    10,
    -1,
    -1,
    -1,
    -1,
    6,
    9,
    5,
    6,
    11,
    9,
    11,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    6,
    11,
    0,
    6,
    3,
    0,
    5,
    6,
    0,
    9,
    5,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    8,
    0,
    5,
    11,
    0,
    1,
    5,
    5,
    6,
    11,
    -1,
    -1,
    -1,
    -1,
    6,
    11,
    3,
    6,
    3,
    5,
    5,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    10,
    9,
    5,
    11,
    9,
    11,
    8,
    11,
    5,
    6,
    -1,
    -1,
    -1,
    -1,
    0,
    11,
    3,
    0,
    6,
    11,
    0,
    9,
    6,
    5,
    6,
    9,
    1,
    2,
    10,
    -1,
    11,
    8,
    5,
    11,
    5,
    6,
    8,
    0,
    5,
    10,
    5,
    2,
    0,
    2,
    5,
    -1,
    6,
    11,
    3,
    6,
    3,
    5,
    2,
    10,
    3,
    10,
    5,
    3,
    -1,
    -1,
    -1,
    -1,
    5,
    8,
    9,
    5,
    2,
    8,
    5,
    6,
    2,
    3,
    8,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    5,
    6,
    9,
    6,
    0,
    0,
    6,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    5,
    8,
    1,
    8,
    0,
    5,
    6,
    8,
    3,
    8,
    2,
    6,
    2,
    8,
    -1,
    1,
    5,
    6,
    2,
    1,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    3,
    6,
    1,
    6,
    10,
    3,
    8,
    6,
    5,
    6,
    9,
    8,
    9,
    6,
    -1,
    10,
    1,
    0,
    10,
    0,
    6,
    9,
    5,
    0,
    5,
    6,
    0,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    8,
    5,
    6,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    5,
    6,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    5,
    10,
    7,
    5,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    5,
    10,
    11,
    7,
    5,
    8,
    3,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    11,
    7,
    5,
    10,
    11,
    1,
    9,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    7,
    5,
    10,
    11,
    7,
    9,
    8,
    1,
    8,
    3,
    1,
    -1,
    -1,
    -1,
    -1,
    11,
    1,
    2,
    11,
    7,
    1,
    7,
    5,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    1,
    2,
    7,
    1,
    7,
    5,
    7,
    2,
    11,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    5,
    9,
    2,
    7,
    9,
    0,
    2,
    2,
    11,
    7,
    -1,
    -1,
    -1,
    -1,
    7,
    5,
    2,
    7,
    2,
    11,
    5,
    9,
    2,
    3,
    2,
    8,
    9,
    8,
    2,
    -1,
    2,
    5,
    10,
    2,
    3,
    5,
    3,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    2,
    0,
    8,
    5,
    2,
    8,
    7,
    5,
    10,
    2,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    1,
    5,
    10,
    3,
    5,
    3,
    7,
    3,
    10,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    2,
    9,
    2,
    1,
    8,
    7,
    2,
    10,
    2,
    5,
    7,
    5,
    2,
    -1,
    1,
    3,
    5,
    3,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    7,
    0,
    7,
    1,
    1,
    7,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    0,
    3,
    9,
    3,
    5,
    5,
    3,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    8,
    7,
    5,
    9,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    8,
    4,
    5,
    10,
    8,
    10,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    5,
    0,
    4,
    5,
    11,
    0,
    5,
    10,
    11,
    11,
    3,
    0,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    9,
    8,
    4,
    10,
    8,
    10,
    11,
    10,
    4,
    5,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    4,
    10,
    4,
    5,
    11,
    3,
    4,
    9,
    4,
    1,
    3,
    1,
    4,
    -1,
    2,
    5,
    1,
    2,
    8,
    5,
    2,
    11,
    8,
    4,
    5,
    8,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    11,
    0,
    11,
    3,
    4,
    5,
    11,
    2,
    11,
    1,
    5,
    1,
    11,
    -1,
    0,
    2,
    5,
    0,
    5,
    9,
    2,
    11,
    5,
    4,
    5,
    8,
    11,
    8,
    5,
    -1,
    9,
    4,
    5,
    2,
    11,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    5,
    10,
    3,
    5,
    2,
    3,
    4,
    5,
    3,
    8,
    4,
    -1,
    -1,
    -1,
    -1,
    5,
    10,
    2,
    5,
    2,
    4,
    4,
    2,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    10,
    2,
    3,
    5,
    10,
    3,
    8,
    5,
    4,
    5,
    8,
    0,
    1,
    9,
    -1,
    5,
    10,
    2,
    5,
    2,
    4,
    1,
    9,
    2,
    9,
    4,
    2,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    5,
    8,
    5,
    3,
    3,
    5,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    4,
    5,
    1,
    0,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    8,
    4,
    5,
    8,
    5,
    3,
    9,
    0,
    5,
    0,
    3,
    5,
    -1,
    -1,
    -1,
    -1,
    9,
    4,
    5,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    11,
    7,
    4,
    9,
    11,
    9,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    8,
    3,
    4,
    9,
    7,
    9,
    11,
    7,
    9,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    1,
    10,
    11,
    1,
    11,
    4,
    1,
    4,
    0,
    7,
    4,
    11,
    -1,
    -1,
    -1,
    -1,
    3,
    1,
    4,
    3,
    4,
    8,
    1,
    10,
    4,
    7,
    4,
    11,
    10,
    11,
    4,
    -1,
    4,
    11,
    7,
    9,
    11,
    4,
    9,
    2,
    11,
    9,
    1,
    2,
    -1,
    -1,
    -1,
    -1,
    9,
    7,
    4,
    9,
    11,
    7,
    9,
    1,
    11,
    2,
    11,
    1,
    0,
    8,
    3,
    -1,
    11,
    7,
    4,
    11,
    4,
    2,
    2,
    4,
    0,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    11,
    7,
    4,
    11,
    4,
    2,
    8,
    3,
    4,
    3,
    2,
    4,
    -1,
    -1,
    -1,
    -1,
    2,
    9,
    10,
    2,
    7,
    9,
    2,
    3,
    7,
    7,
    4,
    9,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    7,
    9,
    7,
    4,
    10,
    2,
    7,
    8,
    7,
    0,
    2,
    0,
    7,
    -1,
    3,
    7,
    10,
    3,
    10,
    2,
    7,
    4,
    10,
    1,
    10,
    0,
    4,
    0,
    10,
    -1,
    1,
    10,
    2,
    8,
    7,
    4,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    1,
    4,
    1,
    7,
    7,
    1,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    9,
    1,
    4,
    1,
    7,
    0,
    8,
    1,
    8,
    7,
    1,
    -1,
    -1,
    -1,
    -1,
    4,
    0,
    3,
    7,
    4,
    3,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    4,
    8,
    7,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    8,
    10,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    9,
    3,
    9,
    11,
    11,
    9,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    10,
    0,
    10,
    8,
    8,
    10,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    1,
    10,
    11,
    3,
    10,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    2,
    11,
    1,
    11,
    9,
    9,
    11,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    0,
    9,
    3,
    9,
    11,
    1,
    2,
    9,
    2,
    11,
    9,
    -1,
    -1,
    -1,
    -1,
    0,
    2,
    11,
    8,
    0,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    3,
    2,
    11,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    8,
    2,
    8,
    10,
    10,
    8,
    9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    9,
    10,
    2,
    0,
    9,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    8,
    2,
    8,
    10,
    0,
    1,
    8,
    1,
    10,
    8,
    -1,
    -1,
    -1,
    -1,
    1,
    10,
    2,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    1,
    3,
    8,
    9,
    1,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    9,
    1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    3,
    8,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
]);
;
 //# sourceMappingURL=MarchingCubes.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/geometries/DecalGeometry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecalGeometry",
    ()=>DecalGeometry,
    "DecalVertex",
    ()=>DecalVertex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class DecalGeometry extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"] {
    constructor(mesh, position, orientation, size){
        super();
        const vertices = [];
        const normals = [];
        const uvs = [];
        const plane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const projectorMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        projectorMatrix.makeRotationFromEuler(orientation);
        projectorMatrix.setPosition(position);
        const projectorMatrixInverse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        projectorMatrixInverse.copy(projectorMatrix).invert();
        generate();
        this.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
        this.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](normals, 3));
        this.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
        function generate() {
            let i;
            let decalVertices = [];
            const vertex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const normal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            if (mesh.geometry.isGeometry === true) {
                console.error("THREE.DecalGeometry no longer supports THREE.Geometry. Use BufferGeometry instead.");
                return;
            }
            const geometry = mesh.geometry;
            const positionAttribute = geometry.attributes.position;
            const normalAttribute = geometry.attributes.normal;
            if (geometry.index !== null) {
                const index = geometry.index;
                for(i = 0; i < index.count; i++){
                    vertex.fromBufferAttribute(positionAttribute, index.getX(i));
                    normal.fromBufferAttribute(normalAttribute, index.getX(i));
                    pushDecalVertex(decalVertices, vertex, normal);
                }
            } else {
                for(i = 0; i < positionAttribute.count; i++){
                    vertex.fromBufferAttribute(positionAttribute, i);
                    normal.fromBufferAttribute(normalAttribute, i);
                    pushDecalVertex(decalVertices, vertex, normal);
                }
            }
            decalVertices = clipGeometry(decalVertices, plane.set(1, 0, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(-1, 0, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 1, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, -1, 0));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 0, 1));
            decalVertices = clipGeometry(decalVertices, plane.set(0, 0, -1));
            for(i = 0; i < decalVertices.length; i++){
                const decalVertex = decalVertices[i];
                uvs.push(0.5 + decalVertex.position.x / size.x, 0.5 + decalVertex.position.y / size.y);
                decalVertex.position.applyMatrix4(projectorMatrix);
                vertices.push(decalVertex.position.x, decalVertex.position.y, decalVertex.position.z);
                normals.push(decalVertex.normal.x, decalVertex.normal.y, decalVertex.normal.z);
            }
        }
        function pushDecalVertex(decalVertices, vertex, normal) {
            vertex.applyMatrix4(mesh.matrixWorld);
            vertex.applyMatrix4(projectorMatrixInverse);
            normal.transformDirection(mesh.matrixWorld);
            decalVertices.push(new DecalVertex(vertex.clone(), normal.clone()));
        }
        function clipGeometry(inVertices, plane2) {
            const outVertices = [];
            const s = 0.5 * Math.abs(size.dot(plane2));
            for(let i = 0; i < inVertices.length; i += 3){
                let v1Out, v2Out, v3Out, total = 0;
                let nV1, nV2, nV3, nV4;
                const d1 = inVertices[i + 0].position.dot(plane2) - s;
                const d2 = inVertices[i + 1].position.dot(plane2) - s;
                const d3 = inVertices[i + 2].position.dot(plane2) - s;
                v1Out = d1 > 0;
                v2Out = d2 > 0;
                v3Out = d3 > 0;
                total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);
                switch(total){
                    case 0:
                        {
                            outVertices.push(inVertices[i]);
                            outVertices.push(inVertices[i + 1]);
                            outVertices.push(inVertices[i + 2]);
                            break;
                        }
                    case 1:
                        {
                            if (v1Out) {
                                nV1 = inVertices[i + 1];
                                nV2 = inVertices[i + 2];
                                nV3 = clip(inVertices[i], nV1, plane2, s);
                                nV4 = clip(inVertices[i], nV2, plane2, s);
                            }
                            if (v2Out) {
                                nV1 = inVertices[i];
                                nV2 = inVertices[i + 2];
                                nV3 = clip(inVertices[i + 1], nV1, plane2, s);
                                nV4 = clip(inVertices[i + 1], nV2, plane2, s);
                                outVertices.push(nV3);
                                outVertices.push(nV2.clone());
                                outVertices.push(nV1.clone());
                                outVertices.push(nV2.clone());
                                outVertices.push(nV3.clone());
                                outVertices.push(nV4);
                                break;
                            }
                            if (v3Out) {
                                nV1 = inVertices[i];
                                nV2 = inVertices[i + 1];
                                nV3 = clip(inVertices[i + 2], nV1, plane2, s);
                                nV4 = clip(inVertices[i + 2], nV2, plane2, s);
                            }
                            outVertices.push(nV1.clone());
                            outVertices.push(nV2.clone());
                            outVertices.push(nV3);
                            outVertices.push(nV4);
                            outVertices.push(nV3.clone());
                            outVertices.push(nV2.clone());
                            break;
                        }
                    case 2:
                        {
                            if (!v1Out) {
                                nV1 = inVertices[i].clone();
                                nV2 = clip(nV1, inVertices[i + 1], plane2, s);
                                nV3 = clip(nV1, inVertices[i + 2], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            if (!v2Out) {
                                nV1 = inVertices[i + 1].clone();
                                nV2 = clip(nV1, inVertices[i + 2], plane2, s);
                                nV3 = clip(nV1, inVertices[i], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            if (!v3Out) {
                                nV1 = inVertices[i + 2].clone();
                                nV2 = clip(nV1, inVertices[i], plane2, s);
                                nV3 = clip(nV1, inVertices[i + 1], plane2, s);
                                outVertices.push(nV1);
                                outVertices.push(nV2);
                                outVertices.push(nV3);
                            }
                            break;
                        }
                }
            }
            return outVertices;
        }
        function clip(v0, v1, p, s) {
            const d0 = v0.position.dot(p) - s;
            const d1 = v1.position.dot(p) - s;
            const s0 = d0 / (d0 - d1);
            const v = new DecalVertex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v0.position.x + s0 * (v1.position.x - v0.position.x), v0.position.y + s0 * (v1.position.y - v0.position.y), v0.position.z + s0 * (v1.position.z - v0.position.z)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v0.normal.x + s0 * (v1.normal.x - v0.normal.x), v0.normal.y + s0 * (v1.normal.y - v0.normal.y), v0.normal.z + s0 * (v1.normal.z - v0.normal.z)));
            return v;
        }
    }
}
class DecalVertex {
    constructor(position, normal){
        this.position = position;
        this.normal = normal;
    }
    clone() {
        return new this.constructor(this.position.clone(), this.normal.clone());
    }
}
;
 //# sourceMappingURL=DecalGeometry.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/loaders/SVGLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SVGLoader",
    ()=>SVGLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
const COLOR_SPACE_SVG = "srgb";
const SVGLoader = /* @__PURE__ */ (()=>{
    class SVGLoader2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
        constructor(manager){
            super(manager);
            this.defaultDPI = 90;
            this.defaultUnit = "px";
        }
        load(url, onLoad, onProgress, onError) {
            const scope = this;
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](scope.manager);
            loader.setPath(scope.path);
            loader.setRequestHeader(scope.requestHeader);
            loader.setWithCredentials(scope.withCredentials);
            loader.load(url, function(text) {
                try {
                    onLoad(scope.parse(text));
                } catch (e) {
                    if (onError) {
                        onError(e);
                    } else {
                        console.error(e);
                    }
                    scope.manager.itemError(url);
                }
            }, onProgress, onError);
        }
        parse(text) {
            const scope = this;
            function parseNode(node, style) {
                if (node.nodeType !== 1) return;
                const transform = getNodeTransform(node);
                let isDefsNode = false;
                let path = null;
                switch(node.nodeName){
                    case "svg":
                        style = parseStyle(node, style);
                        break;
                    case "style":
                        parseCSSStylesheet(node);
                        break;
                    case "g":
                        style = parseStyle(node, style);
                        break;
                    case "path":
                        style = parseStyle(node, style);
                        if (node.hasAttribute("d")) path = parsePathNode(node);
                        break;
                    case "rect":
                        style = parseStyle(node, style);
                        path = parseRectNode(node);
                        break;
                    case "polygon":
                        style = parseStyle(node, style);
                        path = parsePolygonNode(node);
                        break;
                    case "polyline":
                        style = parseStyle(node, style);
                        path = parsePolylineNode(node);
                        break;
                    case "circle":
                        style = parseStyle(node, style);
                        path = parseCircleNode(node);
                        break;
                    case "ellipse":
                        style = parseStyle(node, style);
                        path = parseEllipseNode(node);
                        break;
                    case "line":
                        style = parseStyle(node, style);
                        path = parseLineNode(node);
                        break;
                    case "defs":
                        isDefsNode = true;
                        break;
                    case "use":
                        style = parseStyle(node, style);
                        const href = node.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "";
                        const usedNodeId = href.substring(1);
                        const usedNode = node.viewportElement.getElementById(usedNodeId);
                        if (usedNode) {
                            parseNode(usedNode, style);
                        } else {
                            console.warn("SVGLoader: 'use node' references non-existent node id: " + usedNodeId);
                        }
                        break;
                }
                if (path) {
                    if (style.fill !== void 0 && style.fill !== "none") {
                        path.color.setStyle(style.fill, COLOR_SPACE_SVG);
                    }
                    transformPath(path, currentTransform);
                    paths.push(path);
                    path.userData = {
                        node,
                        style
                    };
                }
                const childNodes = node.childNodes;
                for(let i = 0; i < childNodes.length; i++){
                    const node2 = childNodes[i];
                    if (isDefsNode && node2.nodeName !== "style" && node2.nodeName !== "defs") {
                        continue;
                    }
                    parseNode(node2, style);
                }
                if (transform) {
                    transformStack.pop();
                    if (transformStack.length > 0) {
                        currentTransform.copy(transformStack[transformStack.length - 1]);
                    } else {
                        currentTransform.identity();
                    }
                }
            }
            function parsePathNode(node) {
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                const point = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                const control = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                const firstPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                let isFirstPoint = true;
                let doSetFirstPoint = false;
                const d = node.getAttribute("d");
                if (d === "" || d === "none") return null;
                const commands = d.match(/[a-df-z][^a-df-z]*/gi);
                for(let i = 0, l = commands.length; i < l; i++){
                    const command = commands[i];
                    const type = command.charAt(0);
                    const data2 = command.slice(1).trim();
                    if (isFirstPoint === true) {
                        doSetFirstPoint = true;
                        isFirstPoint = false;
                    }
                    let numbers;
                    switch(type){
                        case "M":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                if (j === 0) {
                                    path.moveTo(point.x, point.y);
                                } else {
                                    path.lineTo(point.x, point.y);
                                }
                                if (j === 0) firstPoint.copy(point);
                            }
                            break;
                        case "H":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.x = numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "V":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.y = numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "L":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "C":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 6){
                                path.bezierCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], numbers[j + 5]);
                                control.x = numbers[j + 2];
                                control.y = numbers[j + 3];
                                point.x = numbers[j + 4];
                                point.y = numbers[j + 5];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "S":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.bezierCurveTo(getReflection(point.x, control.x), getReflection(point.y, control.y), numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3]);
                                control.x = numbers[j + 0];
                                control.y = numbers[j + 1];
                                point.x = numbers[j + 2];
                                point.y = numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "Q":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.quadraticCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3]);
                                control.x = numbers[j + 0];
                                control.y = numbers[j + 1];
                                point.x = numbers[j + 2];
                                point.y = numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "T":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                const rx = getReflection(point.x, control.x);
                                const ry = getReflection(point.y, control.y);
                                path.quadraticCurveTo(rx, ry, numbers[j + 0], numbers[j + 1]);
                                control.x = rx;
                                control.y = ry;
                                point.x = numbers[j + 0];
                                point.y = numbers[j + 1];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "A":
                            numbers = parseFloats(data2, [
                                3,
                                4
                            ], 7);
                            for(let j = 0, jl = numbers.length; j < jl; j += 7){
                                if (numbers[j + 5] == point.x && numbers[j + 6] == point.y) continue;
                                const start = point.clone();
                                point.x = numbers[j + 5];
                                point.y = numbers[j + 6];
                                control.x = point.x;
                                control.y = point.y;
                                parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "m":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x += numbers[j + 0];
                                point.y += numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                if (j === 0) {
                                    path.moveTo(point.x, point.y);
                                } else {
                                    path.lineTo(point.x, point.y);
                                }
                                if (j === 0) firstPoint.copy(point);
                            }
                            break;
                        case "h":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.x += numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "v":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j++){
                                point.y += numbers[j];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "l":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                point.x += numbers[j + 0];
                                point.y += numbers[j + 1];
                                control.x = point.x;
                                control.y = point.y;
                                path.lineTo(point.x, point.y);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "c":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 6){
                                path.bezierCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3], point.x + numbers[j + 4], point.y + numbers[j + 5]);
                                control.x = point.x + numbers[j + 2];
                                control.y = point.y + numbers[j + 3];
                                point.x += numbers[j + 4];
                                point.y += numbers[j + 5];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "s":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.bezierCurveTo(getReflection(point.x, control.x), getReflection(point.y, control.y), point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3]);
                                control.x = point.x + numbers[j + 0];
                                control.y = point.y + numbers[j + 1];
                                point.x += numbers[j + 2];
                                point.y += numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "q":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 4){
                                path.quadraticCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3]);
                                control.x = point.x + numbers[j + 0];
                                control.y = point.y + numbers[j + 1];
                                point.x += numbers[j + 2];
                                point.y += numbers[j + 3];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "t":
                            numbers = parseFloats(data2);
                            for(let j = 0, jl = numbers.length; j < jl; j += 2){
                                const rx = getReflection(point.x, control.x);
                                const ry = getReflection(point.y, control.y);
                                path.quadraticCurveTo(rx, ry, point.x + numbers[j + 0], point.y + numbers[j + 1]);
                                control.x = rx;
                                control.y = ry;
                                point.x = point.x + numbers[j + 0];
                                point.y = point.y + numbers[j + 1];
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "a":
                            numbers = parseFloats(data2, [
                                3,
                                4
                            ], 7);
                            for(let j = 0, jl = numbers.length; j < jl; j += 7){
                                if (numbers[j + 5] == 0 && numbers[j + 6] == 0) continue;
                                const start = point.clone();
                                point.x += numbers[j + 5];
                                point.y += numbers[j + 6];
                                control.x = point.x;
                                control.y = point.y;
                                parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point);
                                if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point);
                            }
                            break;
                        case "Z":
                        case "z":
                            path.currentPath.autoClose = true;
                            if (path.currentPath.curves.length > 0) {
                                point.copy(firstPoint);
                                path.currentPath.currentPoint.copy(point);
                                isFirstPoint = true;
                            }
                            break;
                        default:
                            console.warn(command);
                    }
                    doSetFirstPoint = false;
                }
                return path;
            }
            function parseCSSStylesheet(node) {
                if (!node.sheet || !node.sheet.cssRules || !node.sheet.cssRules.length) return;
                for(let i = 0; i < node.sheet.cssRules.length; i++){
                    const stylesheet = node.sheet.cssRules[i];
                    if (stylesheet.type !== 1) continue;
                    const selectorList = stylesheet.selectorText.split(/,/gm).filter(Boolean).map((i2)=>i2.trim());
                    for(let j = 0; j < selectorList.length; j++){
                        const definitions = Object.fromEntries(Object.entries(stylesheet.style).filter(([, v])=>v !== ""));
                        stylesheets[selectorList[j]] = Object.assign(stylesheets[selectorList[j]] || {}, definitions);
                    }
                }
            }
            function parseArcCommand(path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end) {
                if (rx == 0 || ry == 0) {
                    path.lineTo(end.x, end.y);
                    return;
                }
                x_axis_rotation = x_axis_rotation * Math.PI / 180;
                rx = Math.abs(rx);
                ry = Math.abs(ry);
                const dx2 = (start.x - end.x) / 2;
                const dy2 = (start.y - end.y) / 2;
                const x1p = Math.cos(x_axis_rotation) * dx2 + Math.sin(x_axis_rotation) * dy2;
                const y1p = -Math.sin(x_axis_rotation) * dx2 + Math.cos(x_axis_rotation) * dy2;
                let rxs = rx * rx;
                let rys = ry * ry;
                const x1ps = x1p * x1p;
                const y1ps = y1p * y1p;
                const cr = x1ps / rxs + y1ps / rys;
                if (cr > 1) {
                    const s = Math.sqrt(cr);
                    rx = s * rx;
                    ry = s * ry;
                    rxs = rx * rx;
                    rys = ry * ry;
                }
                const dq = rxs * y1ps + rys * x1ps;
                const pq = (rxs * rys - dq) / dq;
                let q = Math.sqrt(Math.max(0, pq));
                if (large_arc_flag === sweep_flag) q = -q;
                const cxp = q * rx * y1p / ry;
                const cyp = -q * ry * x1p / rx;
                const cx = Math.cos(x_axis_rotation) * cxp - Math.sin(x_axis_rotation) * cyp + (start.x + end.x) / 2;
                const cy = Math.sin(x_axis_rotation) * cxp + Math.cos(x_axis_rotation) * cyp + (start.y + end.y) / 2;
                const theta = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
                const delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % (Math.PI * 2);
                path.currentPath.absellipse(cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation);
            }
            function svgAngle(ux, uy, vx, vy) {
                const dot = ux * vx + uy * vy;
                const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
                let ang = Math.acos(Math.max(-1, Math.min(1, dot / len)));
                if (ux * vy - uy * vx < 0) ang = -ang;
                return ang;
            }
            function parseRectNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("x") || 0);
                const y = parseFloatWithUnits(node.getAttribute("y") || 0);
                const rx = parseFloatWithUnits(node.getAttribute("rx") || node.getAttribute("ry") || 0);
                const ry = parseFloatWithUnits(node.getAttribute("ry") || node.getAttribute("rx") || 0);
                const w = parseFloatWithUnits(node.getAttribute("width"));
                const h = parseFloatWithUnits(node.getAttribute("height"));
                const bci = 1 - 0.551915024494;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.moveTo(x + rx, y);
                path.lineTo(x + w - rx, y);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + w - rx * bci, y, x + w, y + ry * bci, x + w, y + ry);
                }
                path.lineTo(x + w, y + h - ry);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + w, y + h - ry * bci, x + w - rx * bci, y + h, x + w - rx, y + h);
                }
                path.lineTo(x + rx, y + h);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x + rx * bci, y + h, x, y + h - ry * bci, x, y + h - ry);
                }
                path.lineTo(x, y + ry);
                if (rx !== 0 || ry !== 0) {
                    path.bezierCurveTo(x, y + ry * bci, x + rx * bci, y, x + rx, y);
                }
                return path;
            }
            function parsePolygonNode(node) {
                function iterator(match, a, b) {
                    const x = parseFloatWithUnits(a);
                    const y = parseFloatWithUnits(b);
                    if (index === 0) {
                        path.moveTo(x, y);
                    } else {
                        path.lineTo(x, y);
                    }
                    index++;
                }
                const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                let index = 0;
                node.getAttribute("points").replace(regex, iterator);
                path.currentPath.autoClose = true;
                return path;
            }
            function parsePolylineNode(node) {
                function iterator(match, a, b) {
                    const x = parseFloatWithUnits(a);
                    const y = parseFloatWithUnits(b);
                    if (index === 0) {
                        path.moveTo(x, y);
                    } else {
                        path.lineTo(x, y);
                    }
                    index++;
                }
                const regex = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                let index = 0;
                node.getAttribute("points").replace(regex, iterator);
                path.currentPath.autoClose = false;
                return path;
            }
            function parseCircleNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
                const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
                const r = parseFloatWithUnits(node.getAttribute("r") || 0);
                const subpath = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Path"]();
                subpath.absarc(x, y, r, 0, Math.PI * 2);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.subPaths.push(subpath);
                return path;
            }
            function parseEllipseNode(node) {
                const x = parseFloatWithUnits(node.getAttribute("cx") || 0);
                const y = parseFloatWithUnits(node.getAttribute("cy") || 0);
                const rx = parseFloatWithUnits(node.getAttribute("rx") || 0);
                const ry = parseFloatWithUnits(node.getAttribute("ry") || 0);
                const subpath = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Path"]();
                subpath.absellipse(x, y, rx, ry, 0, Math.PI * 2);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.subPaths.push(subpath);
                return path;
            }
            function parseLineNode(node) {
                const x1 = parseFloatWithUnits(node.getAttribute("x1") || 0);
                const y1 = parseFloatWithUnits(node.getAttribute("y1") || 0);
                const x2 = parseFloatWithUnits(node.getAttribute("x2") || 0);
                const y2 = parseFloatWithUnits(node.getAttribute("y2") || 0);
                const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapePath"]();
                path.moveTo(x1, y1);
                path.lineTo(x2, y2);
                path.currentPath.autoClose = false;
                return path;
            }
            function parseStyle(node, style) {
                style = Object.assign({}, style);
                let stylesheetStyles = {};
                if (node.hasAttribute("class")) {
                    const classSelectors = node.getAttribute("class").split(/\s/).filter(Boolean).map((i)=>i.trim());
                    for(let i = 0; i < classSelectors.length; i++){
                        stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["." + classSelectors[i]]);
                    }
                }
                if (node.hasAttribute("id")) {
                    stylesheetStyles = Object.assign(stylesheetStyles, stylesheets["#" + node.getAttribute("id")]);
                }
                function addStyle(svgName, jsName, adjustFunction) {
                    if (adjustFunction === void 0) adjustFunction = function copy(v) {
                        if (v.startsWith("url")) console.warn("SVGLoader: url access in attributes is not implemented.");
                        return v;
                    };
                    if (node.hasAttribute(svgName)) style[jsName] = adjustFunction(node.getAttribute(svgName));
                    if (stylesheetStyles[svgName]) style[jsName] = adjustFunction(stylesheetStyles[svgName]);
                    if (node.style && node.style[svgName] !== "") style[jsName] = adjustFunction(node.style[svgName]);
                }
                function clamp(v) {
                    return Math.max(0, Math.min(1, parseFloatWithUnits(v)));
                }
                function positive(v) {
                    return Math.max(0, parseFloatWithUnits(v));
                }
                addStyle("fill", "fill");
                addStyle("fill-opacity", "fillOpacity", clamp);
                addStyle("fill-rule", "fillRule");
                addStyle("opacity", "opacity", clamp);
                addStyle("stroke", "stroke");
                addStyle("stroke-opacity", "strokeOpacity", clamp);
                addStyle("stroke-width", "strokeWidth", positive);
                addStyle("stroke-linejoin", "strokeLineJoin");
                addStyle("stroke-linecap", "strokeLineCap");
                addStyle("stroke-miterlimit", "strokeMiterLimit", positive);
                addStyle("visibility", "visibility");
                return style;
            }
            function getReflection(a, b) {
                return a - (b - a);
            }
            function parseFloats(input, flags, stride) {
                if (typeof input !== "string") {
                    throw new TypeError("Invalid input: " + typeof input);
                }
                const RE = {
                    SEPARATOR: /[ \t\r\n\,.\-+]/,
                    WHITESPACE: /[ \t\r\n]/,
                    DIGIT: /[\d]/,
                    SIGN: /[-+]/,
                    POINT: /\./,
                    COMMA: /,/,
                    EXP: /e/i,
                    FLAGS: /[01]/
                };
                const SEP = 0;
                const INT = 1;
                const FLOAT = 2;
                const EXP = 3;
                let state = SEP;
                let seenComma = true;
                let number = "", exponent = "";
                const result = [];
                function throwSyntaxError(current2, i, partial) {
                    const error = new SyntaxError('Unexpected character "' + current2 + '" at index ' + i + ".");
                    error.partial = partial;
                    throw error;
                }
                function newNumber() {
                    if (number !== "") {
                        if (exponent === "") result.push(Number(number));
                        else result.push(Number(number) * Math.pow(10, Number(exponent)));
                    }
                    number = "";
                    exponent = "";
                }
                let current;
                const length = input.length;
                for(let i = 0; i < length; i++){
                    current = input[i];
                    if (Array.isArray(flags) && flags.includes(result.length % stride) && RE.FLAGS.test(current)) {
                        state = INT;
                        number = current;
                        newNumber();
                        continue;
                    }
                    if (state === SEP) {
                        if (RE.WHITESPACE.test(current)) {
                            continue;
                        }
                        if (RE.DIGIT.test(current) || RE.SIGN.test(current)) {
                            state = INT;
                            number = current;
                            continue;
                        }
                        if (RE.POINT.test(current)) {
                            state = FLOAT;
                            number = current;
                            continue;
                        }
                        if (RE.COMMA.test(current)) {
                            if (seenComma) {
                                throwSyntaxError(current, i, result);
                            }
                            seenComma = true;
                        }
                    }
                    if (state === INT) {
                        if (RE.DIGIT.test(current)) {
                            number += current;
                            continue;
                        }
                        if (RE.POINT.test(current)) {
                            number += current;
                            state = FLOAT;
                            continue;
                        }
                        if (RE.EXP.test(current)) {
                            state = EXP;
                            continue;
                        }
                        if (RE.SIGN.test(current) && number.length === 1 && RE.SIGN.test(number[0])) {
                            throwSyntaxError(current, i, result);
                        }
                    }
                    if (state === FLOAT) {
                        if (RE.DIGIT.test(current)) {
                            number += current;
                            continue;
                        }
                        if (RE.EXP.test(current)) {
                            state = EXP;
                            continue;
                        }
                        if (RE.POINT.test(current) && number[number.length - 1] === ".") {
                            throwSyntaxError(current, i, result);
                        }
                    }
                    if (state === EXP) {
                        if (RE.DIGIT.test(current)) {
                            exponent += current;
                            continue;
                        }
                        if (RE.SIGN.test(current)) {
                            if (exponent === "") {
                                exponent += current;
                                continue;
                            }
                            if (exponent.length === 1 && RE.SIGN.test(exponent)) {
                                throwSyntaxError(current, i, result);
                            }
                        }
                    }
                    if (RE.WHITESPACE.test(current)) {
                        newNumber();
                        state = SEP;
                        seenComma = false;
                    } else if (RE.COMMA.test(current)) {
                        newNumber();
                        state = SEP;
                        seenComma = true;
                    } else if (RE.SIGN.test(current)) {
                        newNumber();
                        state = INT;
                        number = current;
                    } else if (RE.POINT.test(current)) {
                        newNumber();
                        state = FLOAT;
                        number = current;
                    } else {
                        throwSyntaxError(current, i, result);
                    }
                }
                newNumber();
                return result;
            }
            const units = [
                "mm",
                "cm",
                "in",
                "pt",
                "pc",
                "px"
            ];
            const unitConversion = {
                mm: {
                    mm: 1,
                    cm: 0.1,
                    in: 1 / 25.4,
                    pt: 72 / 25.4,
                    pc: 6 / 25.4,
                    px: -1
                },
                cm: {
                    mm: 10,
                    cm: 1,
                    in: 1 / 2.54,
                    pt: 72 / 2.54,
                    pc: 6 / 2.54,
                    px: -1
                },
                in: {
                    mm: 25.4,
                    cm: 2.54,
                    in: 1,
                    pt: 72,
                    pc: 6,
                    px: -1
                },
                pt: {
                    mm: 25.4 / 72,
                    cm: 2.54 / 72,
                    in: 1 / 72,
                    pt: 1,
                    pc: 6 / 72,
                    px: -1
                },
                pc: {
                    mm: 25.4 / 6,
                    cm: 2.54 / 6,
                    in: 1 / 6,
                    pt: 72 / 6,
                    pc: 1,
                    px: -1
                },
                px: {
                    px: 1
                }
            };
            function parseFloatWithUnits(string) {
                let theUnit = "px";
                if (typeof string === "string" || string instanceof String) {
                    for(let i = 0, n = units.length; i < n; i++){
                        const u = units[i];
                        if (string.endsWith(u)) {
                            theUnit = u;
                            string = string.substring(0, string.length - u.length);
                            break;
                        }
                    }
                }
                let scale = void 0;
                if (theUnit === "px" && scope.defaultUnit !== "px") {
                    scale = unitConversion["in"][scope.defaultUnit] / scope.defaultDPI;
                } else {
                    scale = unitConversion[theUnit][scope.defaultUnit];
                    if (scale < 0) {
                        scale = unitConversion[theUnit]["in"] * scope.defaultDPI;
                    }
                }
                return scale * parseFloat(string);
            }
            function getNodeTransform(node) {
                if (!(node.hasAttribute("transform") || node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y")))) {
                    return null;
                }
                const transform = parseNodeTransform(node);
                if (transformStack.length > 0) {
                    transform.premultiply(transformStack[transformStack.length - 1]);
                }
                currentTransform.copy(transform);
                transformStack.push(transform);
                return transform;
            }
            function parseNodeTransform(node) {
                const transform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
                const currentTransform2 = tempTransform0;
                if (node.nodeName === "use" && (node.hasAttribute("x") || node.hasAttribute("y"))) {
                    const tx = parseFloatWithUnits(node.getAttribute("x"));
                    const ty = parseFloatWithUnits(node.getAttribute("y"));
                    transform.translate(tx, ty);
                }
                if (node.hasAttribute("transform")) {
                    const transformsTexts = node.getAttribute("transform").split(")");
                    for(let tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex--){
                        const transformText = transformsTexts[tIndex].trim();
                        if (transformText === "") continue;
                        const openParPos = transformText.indexOf("(");
                        const closeParPos = transformText.length;
                        if (openParPos > 0 && openParPos < closeParPos) {
                            const transformType = transformText.slice(0, openParPos);
                            const array = parseFloats(transformText.slice(openParPos + 1));
                            currentTransform2.identity();
                            switch(transformType){
                                case "translate":
                                    if (array.length >= 1) {
                                        const tx = array[0];
                                        let ty = 0;
                                        if (array.length >= 2) {
                                            ty = array[1];
                                        }
                                        currentTransform2.translate(tx, ty);
                                    }
                                    break;
                                case "rotate":
                                    if (array.length >= 1) {
                                        let angle = 0;
                                        let cx = 0;
                                        let cy = 0;
                                        angle = array[0] * Math.PI / 180;
                                        if (array.length >= 3) {
                                            cx = array[1];
                                            cy = array[2];
                                        }
                                        tempTransform1.makeTranslation(-cx, -cy);
                                        tempTransform2.makeRotation(angle);
                                        tempTransform3.multiplyMatrices(tempTransform2, tempTransform1);
                                        tempTransform1.makeTranslation(cx, cy);
                                        currentTransform2.multiplyMatrices(tempTransform1, tempTransform3);
                                    }
                                    break;
                                case "scale":
                                    if (array.length >= 1) {
                                        const scaleX = array[0];
                                        let scaleY = scaleX;
                                        if (array.length >= 2) {
                                            scaleY = array[1];
                                        }
                                        currentTransform2.scale(scaleX, scaleY);
                                    }
                                    break;
                                case "skewX":
                                    if (array.length === 1) {
                                        currentTransform2.set(1, Math.tan(array[0] * Math.PI / 180), 0, 0, 1, 0, 0, 0, 1);
                                    }
                                    break;
                                case "skewY":
                                    if (array.length === 1) {
                                        currentTransform2.set(1, 0, 0, Math.tan(array[0] * Math.PI / 180), 1, 0, 0, 0, 1);
                                    }
                                    break;
                                case "matrix":
                                    if (array.length === 6) {
                                        currentTransform2.set(array[0], array[2], array[4], array[1], array[3], array[5], 0, 0, 1);
                                    }
                                    break;
                            }
                        }
                        transform.premultiply(currentTransform2);
                    }
                }
                return transform;
            }
            function transformPath(path, m) {
                function transfVec2(v2) {
                    tempV3.set(v2.x, v2.y, 1).applyMatrix3(m);
                    v2.set(tempV3.x, tempV3.y);
                }
                function transfEllipseGeneric(curve) {
                    const a = curve.xRadius;
                    const b = curve.yRadius;
                    const cosTheta = Math.cos(curve.aRotation);
                    const sinTheta = Math.sin(curve.aRotation);
                    const v1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](a * cosTheta, a * sinTheta, 0);
                    const v2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-b * sinTheta, b * cosTheta, 0);
                    const f1 = v1.applyMatrix3(m);
                    const f2 = v2.applyMatrix3(m);
                    const mF = tempTransform0.set(f1.x, f2.x, 0, f1.y, f2.y, 0, 0, 0, 1);
                    const mFInv = tempTransform1.copy(mF).invert();
                    const mFInvT = tempTransform2.copy(mFInv).transpose();
                    const mQ = mFInvT.multiply(mFInv);
                    const mQe = mQ.elements;
                    const ed = eigenDecomposition(mQe[0], mQe[1], mQe[4]);
                    const rt1sqrt = Math.sqrt(ed.rt1);
                    const rt2sqrt = Math.sqrt(ed.rt2);
                    curve.xRadius = 1 / rt1sqrt;
                    curve.yRadius = 1 / rt2sqrt;
                    curve.aRotation = Math.atan2(ed.sn, ed.cs);
                    const isFullEllipse = (curve.aEndAngle - curve.aStartAngle) % (2 * Math.PI) < Number.EPSILON;
                    if (!isFullEllipse) {
                        const mDsqrt = tempTransform1.set(rt1sqrt, 0, 0, 0, rt2sqrt, 0, 0, 0, 1);
                        const mRT = tempTransform2.set(ed.cs, ed.sn, 0, -ed.sn, ed.cs, 0, 0, 0, 1);
                        const mDRF = mDsqrt.multiply(mRT).multiply(mF);
                        const transformAngle = (phi)=>{
                            const { x: cosR, y: sinR } = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(phi), Math.sin(phi), 0).applyMatrix3(mDRF);
                            return Math.atan2(sinR, cosR);
                        };
                        curve.aStartAngle = transformAngle(curve.aStartAngle);
                        curve.aEndAngle = transformAngle(curve.aEndAngle);
                        if (isTransformFlipped(m)) {
                            curve.aClockwise = !curve.aClockwise;
                        }
                    }
                }
                function transfEllipseNoSkew(curve) {
                    const sx = getTransformScaleX(m);
                    const sy = getTransformScaleY(m);
                    curve.xRadius *= sx;
                    curve.yRadius *= sy;
                    const theta = sx > Number.EPSILON ? Math.atan2(m.elements[1], m.elements[0]) : Math.atan2(-m.elements[3], m.elements[4]);
                    curve.aRotation += theta;
                    if (isTransformFlipped(m)) {
                        curve.aStartAngle *= -1;
                        curve.aEndAngle *= -1;
                        curve.aClockwise = !curve.aClockwise;
                    }
                }
                const subPaths = path.subPaths;
                for(let i = 0, n = subPaths.length; i < n; i++){
                    const subPath = subPaths[i];
                    const curves = subPath.curves;
                    for(let j = 0; j < curves.length; j++){
                        const curve = curves[j];
                        if (curve.isLineCurve) {
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                        } else if (curve.isCubicBezierCurve) {
                            transfVec2(curve.v0);
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                            transfVec2(curve.v3);
                        } else if (curve.isQuadraticBezierCurve) {
                            transfVec2(curve.v0);
                            transfVec2(curve.v1);
                            transfVec2(curve.v2);
                        } else if (curve.isEllipseCurve) {
                            tempV2.set(curve.aX, curve.aY);
                            transfVec2(tempV2);
                            curve.aX = tempV2.x;
                            curve.aY = tempV2.y;
                            if (isTransformSkewed(m)) {
                                transfEllipseGeneric(curve);
                            } else {
                                transfEllipseNoSkew(curve);
                            }
                        }
                    }
                }
            }
            function isTransformFlipped(m) {
                const te = m.elements;
                return te[0] * te[4] - te[1] * te[3] < 0;
            }
            function isTransformSkewed(m) {
                const te = m.elements;
                const basisDot = te[0] * te[3] + te[1] * te[4];
                if (basisDot === 0) return false;
                const sx = getTransformScaleX(m);
                const sy = getTransformScaleY(m);
                return Math.abs(basisDot / (sx * sy)) > Number.EPSILON;
            }
            function getTransformScaleX(m) {
                const te = m.elements;
                return Math.sqrt(te[0] * te[0] + te[1] * te[1]);
            }
            function getTransformScaleY(m) {
                const te = m.elements;
                return Math.sqrt(te[3] * te[3] + te[4] * te[4]);
            }
            function eigenDecomposition(A, B, C) {
                let rt1, rt2, cs, sn, t;
                const sm = A + C;
                const df = A - C;
                const rt = Math.sqrt(df * df + 4 * B * B);
                if (sm > 0) {
                    rt1 = 0.5 * (sm + rt);
                    t = 1 / rt1;
                    rt2 = A * t * C - B * t * B;
                } else if (sm < 0) {
                    rt2 = 0.5 * (sm - rt);
                } else {
                    rt1 = 0.5 * rt;
                    rt2 = -0.5 * rt;
                }
                if (df > 0) {
                    cs = df + rt;
                } else {
                    cs = df - rt;
                }
                if (Math.abs(cs) > 2 * Math.abs(B)) {
                    t = -2 * B / cs;
                    sn = 1 / Math.sqrt(1 + t * t);
                    cs = t * sn;
                } else if (Math.abs(B) === 0) {
                    cs = 1;
                    sn = 0;
                } else {
                    t = -0.5 * cs / B;
                    cs = 1 / Math.sqrt(1 + t * t);
                    sn = t * cs;
                }
                if (df > 0) {
                    t = cs;
                    cs = -sn;
                    sn = t;
                }
                return {
                    rt1,
                    rt2,
                    cs,
                    sn
                };
            }
            const paths = [];
            const stylesheets = {};
            const transformStack = [];
            const tempTransform0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempTransform3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
            const tempV2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const currentTransform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]();
            const xml = new DOMParser().parseFromString(text, "image/svg+xml");
            parseNode(xml.documentElement, {
                fill: "#000",
                fillOpacity: 1,
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLineJoin: "miter",
                strokeLineCap: "butt",
                strokeMiterLimit: 4
            });
            const data = {
                paths,
                xml: xml.documentElement
            };
            return data;
        }
        static createShapes(shapePath) {
            const BIGNUMBER = 999999999;
            const IntersectionLocationType = {
                ORIGIN: 0,
                DESTINATION: 1,
                BETWEEN: 2,
                LEFT: 3,
                RIGHT: 4,
                BEHIND: 5,
                BEYOND: 6
            };
            const classifyResult = {
                loc: IntersectionLocationType.ORIGIN,
                t: 0
            };
            function findEdgeIntersection(a0, a1, b0, b1) {
                const x1 = a0.x;
                const x2 = a1.x;
                const x3 = b0.x;
                const x4 = b1.x;
                const y1 = a0.y;
                const y2 = a1.y;
                const y3 = b0.y;
                const y4 = b1.y;
                const nom1 = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
                const nom2 = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
                const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
                const t1 = nom1 / denom;
                const t2 = nom2 / denom;
                if (denom === 0 && nom1 !== 0 || t1 <= 0 || t1 >= 1 || t2 < 0 || t2 > 1) {
                    return null;
                } else if (nom1 === 0 && denom === 0) {
                    for(let i = 0; i < 2; i++){
                        classifyPoint(i === 0 ? b0 : b1, a0, a1);
                        if (classifyResult.loc == IntersectionLocationType.ORIGIN) {
                            const point = i === 0 ? b0 : b1;
                            return {
                                x: point.x,
                                y: point.y,
                                t: classifyResult.t
                            };
                        } else if (classifyResult.loc == IntersectionLocationType.BETWEEN) {
                            const x = +(x1 + classifyResult.t * (x2 - x1)).toPrecision(10);
                            const y = +(y1 + classifyResult.t * (y2 - y1)).toPrecision(10);
                            return {
                                x,
                                y,
                                t: classifyResult.t
                            };
                        }
                    }
                    return null;
                } else {
                    for(let i = 0; i < 2; i++){
                        classifyPoint(i === 0 ? b0 : b1, a0, a1);
                        if (classifyResult.loc == IntersectionLocationType.ORIGIN) {
                            const point = i === 0 ? b0 : b1;
                            return {
                                x: point.x,
                                y: point.y,
                                t: classifyResult.t
                            };
                        }
                    }
                    const x = +(x1 + t1 * (x2 - x1)).toPrecision(10);
                    const y = +(y1 + t1 * (y2 - y1)).toPrecision(10);
                    return {
                        x,
                        y,
                        t: t1
                    };
                }
            }
            function classifyPoint(p, edgeStart, edgeEnd) {
                const ax = edgeEnd.x - edgeStart.x;
                const ay = edgeEnd.y - edgeStart.y;
                const bx = p.x - edgeStart.x;
                const by = p.y - edgeStart.y;
                const sa = ax * by - bx * ay;
                if (p.x === edgeStart.x && p.y === edgeStart.y) {
                    classifyResult.loc = IntersectionLocationType.ORIGIN;
                    classifyResult.t = 0;
                    return;
                }
                if (p.x === edgeEnd.x && p.y === edgeEnd.y) {
                    classifyResult.loc = IntersectionLocationType.DESTINATION;
                    classifyResult.t = 1;
                    return;
                }
                if (sa < -Number.EPSILON) {
                    classifyResult.loc = IntersectionLocationType.LEFT;
                    return;
                }
                if (sa > Number.EPSILON) {
                    classifyResult.loc = IntersectionLocationType.RIGHT;
                    return;
                }
                if (ax * bx < 0 || ay * by < 0) {
                    classifyResult.loc = IntersectionLocationType.BEHIND;
                    return;
                }
                if (Math.sqrt(ax * ax + ay * ay) < Math.sqrt(bx * bx + by * by)) {
                    classifyResult.loc = IntersectionLocationType.BEYOND;
                    return;
                }
                let t;
                if (ax !== 0) {
                    t = bx / ax;
                } else {
                    t = by / ay;
                }
                classifyResult.loc = IntersectionLocationType.BETWEEN;
                classifyResult.t = t;
            }
            function getIntersections(path1, path2) {
                const intersectionsRaw = [];
                const intersections = [];
                for(let index = 1; index < path1.length; index++){
                    const path1EdgeStart = path1[index - 1];
                    const path1EdgeEnd = path1[index];
                    for(let index2 = 1; index2 < path2.length; index2++){
                        const path2EdgeStart = path2[index2 - 1];
                        const path2EdgeEnd = path2[index2];
                        const intersection = findEdgeIntersection(path1EdgeStart, path1EdgeEnd, path2EdgeStart, path2EdgeEnd);
                        if (intersection !== null && intersectionsRaw.find((i)=>i.t <= intersection.t + Number.EPSILON && i.t >= intersection.t - Number.EPSILON) === void 0) {
                            intersectionsRaw.push(intersection);
                            intersections.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](intersection.x, intersection.y));
                        }
                    }
                }
                return intersections;
            }
            function getScanlineIntersections(scanline, boundingBox, paths) {
                const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                boundingBox.getCenter(center);
                const allIntersections = [];
                paths.forEach((path)=>{
                    if (path.boundingBox.containsPoint(center)) {
                        const intersections = getIntersections(scanline, path.points);
                        intersections.forEach((p)=>{
                            allIntersections.push({
                                identifier: path.identifier,
                                isCW: path.isCW,
                                point: p
                            });
                        });
                    }
                });
                allIntersections.sort((i1, i2)=>{
                    return i1.point.x - i2.point.x;
                });
                return allIntersections;
            }
            function isHoleTo(simplePath, allPaths, scanlineMinX2, scanlineMaxX2, _fillRule) {
                if (_fillRule === null || _fillRule === void 0 || _fillRule === "") {
                    _fillRule = "nonzero";
                }
                const centerBoundingBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
                simplePath.boundingBox.getCenter(centerBoundingBox);
                const scanline = [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](scanlineMinX2, centerBoundingBox.y),
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](scanlineMaxX2, centerBoundingBox.y)
                ];
                const scanlineIntersections = getScanlineIntersections(scanline, simplePath.boundingBox, allPaths);
                scanlineIntersections.sort((i1, i2)=>{
                    return i1.point.x - i2.point.x;
                });
                const baseIntersections = [];
                const otherIntersections = [];
                scanlineIntersections.forEach((i2)=>{
                    if (i2.identifier === simplePath.identifier) {
                        baseIntersections.push(i2);
                    } else {
                        otherIntersections.push(i2);
                    }
                });
                const firstXOfPath = baseIntersections[0].point.x;
                const stack = [];
                let i = 0;
                while(i < otherIntersections.length && otherIntersections[i].point.x < firstXOfPath){
                    if (stack.length > 0 && stack[stack.length - 1] === otherIntersections[i].identifier) {
                        stack.pop();
                    } else {
                        stack.push(otherIntersections[i].identifier);
                    }
                    i++;
                }
                stack.push(simplePath.identifier);
                if (_fillRule === "evenodd") {
                    const isHole = stack.length % 2 === 0 ? true : false;
                    const isHoleFor = stack[stack.length - 2];
                    return {
                        identifier: simplePath.identifier,
                        isHole,
                        for: isHoleFor
                    };
                } else if (_fillRule === "nonzero") {
                    let isHole = true;
                    let isHoleFor = null;
                    let lastCWValue = null;
                    for(let i2 = 0; i2 < stack.length; i2++){
                        const identifier = stack[i2];
                        if (isHole) {
                            lastCWValue = allPaths[identifier].isCW;
                            isHole = false;
                            isHoleFor = identifier;
                        } else if (lastCWValue !== allPaths[identifier].isCW) {
                            lastCWValue = allPaths[identifier].isCW;
                            isHole = true;
                        }
                    }
                    return {
                        identifier: simplePath.identifier,
                        isHole,
                        for: isHoleFor
                    };
                } else {
                    console.warn('fill-rule: "' + _fillRule + '" is currently not implemented.');
                }
            }
            let scanlineMinX = BIGNUMBER;
            let scanlineMaxX = -BIGNUMBER;
            let simplePaths = shapePath.subPaths.map((p)=>{
                const points = p.getPoints();
                let maxY = -BIGNUMBER;
                let minY = BIGNUMBER;
                let maxX = -BIGNUMBER;
                let minX = BIGNUMBER;
                for(let i = 0; i < points.length; i++){
                    const p2 = points[i];
                    if (p2.y > maxY) {
                        maxY = p2.y;
                    }
                    if (p2.y < minY) {
                        minY = p2.y;
                    }
                    if (p2.x > maxX) {
                        maxX = p2.x;
                    }
                    if (p2.x < minX) {
                        minX = p2.x;
                    }
                }
                if (scanlineMaxX <= maxX) {
                    scanlineMaxX = maxX + 1;
                }
                if (scanlineMinX >= minX) {
                    scanlineMinX = minX - 1;
                }
                return {
                    curves: p.curves,
                    points,
                    isCW: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShapeUtils"].isClockWise(points),
                    identifier: -1,
                    boundingBox: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box2"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](minX, minY), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](maxX, maxY))
                };
            });
            simplePaths = simplePaths.filter((sp)=>sp.points.length > 1);
            for(let identifier = 0; identifier < simplePaths.length; identifier++){
                simplePaths[identifier].identifier = identifier;
            }
            const isAHole = simplePaths.map((p)=>isHoleTo(p, simplePaths, scanlineMinX, scanlineMaxX, shapePath.userData ? shapePath.userData.style.fillRule : void 0));
            const shapesToReturn = [];
            simplePaths.forEach((p)=>{
                const amIAHole = isAHole[p.identifier];
                if (!amIAHole.isHole) {
                    const shape = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Shape"]();
                    shape.curves = p.curves;
                    const holes = isAHole.filter((h)=>h.isHole && h.for === p.identifier);
                    holes.forEach((h)=>{
                        const hole = simplePaths[h.identifier];
                        const path = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Path"]();
                        path.curves = hole.curves;
                        shape.holes.push(path);
                    });
                    shapesToReturn.push(shape);
                }
            });
            return shapesToReturn;
        }
        static getStrokeStyle(width, color, lineJoin, lineCap, miterLimit) {
            width = width !== void 0 ? width : 1;
            color = color !== void 0 ? color : "#000";
            lineJoin = lineJoin !== void 0 ? lineJoin : "miter";
            lineCap = lineCap !== void 0 ? lineCap : "butt";
            miterLimit = miterLimit !== void 0 ? miterLimit : 4;
            return {
                strokeColor: color,
                strokeWidth: width,
                strokeLineJoin: lineJoin,
                strokeLineCap: lineCap,
                strokeMiterLimit: miterLimit
            };
        }
        static pointsToStroke(points, style, arcDivisions, minDistance) {
            const vertices = [];
            const normals = [];
            const uvs = [];
            if (SVGLoader2.pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs) === 0) {
                return null;
            }
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
            geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](normals, 3));
            geometry.setAttribute("uv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](uvs, 2));
            return geometry;
        }
        static pointsToStrokeWithBuffers(points, style, arcDivisions, minDistance, vertices, normals, uvs, vertexOffset) {
            const tempV2_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_4 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_5 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_6 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const tempV2_7 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const lastPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const lastPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const point0L = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const point0R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const currentPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const currentPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const nextPointL = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const nextPointR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const innerPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            const outerPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
            arcDivisions = arcDivisions !== void 0 ? arcDivisions : 12;
            minDistance = minDistance !== void 0 ? minDistance : 1e-3;
            vertexOffset = vertexOffset !== void 0 ? vertexOffset : 0;
            points = removeDuplicatedPoints(points);
            const numPoints = points.length;
            if (numPoints < 2) return 0;
            const isClosed = points[0].equals(points[numPoints - 1]);
            let currentPoint;
            let previousPoint = points[0];
            let nextPoint;
            const strokeWidth2 = style.strokeWidth / 2;
            const deltaU = 1 / (numPoints - 1);
            let u0 = 0, u1;
            let innerSideModified;
            let joinIsOnLeftSide;
            let isMiter;
            let initialJoinIsOnLeftSide = false;
            let numVertices = 0;
            let currentCoordinate = vertexOffset * 3;
            let currentCoordinateUV = vertexOffset * 2;
            getNormal(points[0], points[1], tempV2_1).multiplyScalar(strokeWidth2);
            lastPointL.copy(points[0]).sub(tempV2_1);
            lastPointR.copy(points[0]).add(tempV2_1);
            point0L.copy(lastPointL);
            point0R.copy(lastPointR);
            for(let iPoint = 1; iPoint < numPoints; iPoint++){
                currentPoint = points[iPoint];
                if (iPoint === numPoints - 1) {
                    if (isClosed) {
                        nextPoint = points[1];
                    } else nextPoint = void 0;
                } else {
                    nextPoint = points[iPoint + 1];
                }
                const normal1 = tempV2_1;
                getNormal(previousPoint, currentPoint, normal1);
                tempV2_3.copy(normal1).multiplyScalar(strokeWidth2);
                currentPointL.copy(currentPoint).sub(tempV2_3);
                currentPointR.copy(currentPoint).add(tempV2_3);
                u1 = u0 + deltaU;
                innerSideModified = false;
                if (nextPoint !== void 0) {
                    getNormal(currentPoint, nextPoint, tempV2_2);
                    tempV2_3.copy(tempV2_2).multiplyScalar(strokeWidth2);
                    nextPointL.copy(currentPoint).sub(tempV2_3);
                    nextPointR.copy(currentPoint).add(tempV2_3);
                    joinIsOnLeftSide = true;
                    tempV2_3.subVectors(nextPoint, previousPoint);
                    if (normal1.dot(tempV2_3) < 0) {
                        joinIsOnLeftSide = false;
                    }
                    if (iPoint === 1) initialJoinIsOnLeftSide = joinIsOnLeftSide;
                    tempV2_3.subVectors(nextPoint, currentPoint);
                    tempV2_3.normalize();
                    const dot = Math.abs(normal1.dot(tempV2_3));
                    if (dot > Number.EPSILON) {
                        const miterSide = strokeWidth2 / dot;
                        tempV2_3.multiplyScalar(-miterSide);
                        tempV2_4.subVectors(currentPoint, previousPoint);
                        tempV2_5.copy(tempV2_4).setLength(miterSide).add(tempV2_3);
                        innerPoint.copy(tempV2_5).negate();
                        const miterLength2 = tempV2_5.length();
                        const segmentLengthPrev = tempV2_4.length();
                        tempV2_4.divideScalar(segmentLengthPrev);
                        tempV2_6.subVectors(nextPoint, currentPoint);
                        const segmentLengthNext = tempV2_6.length();
                        tempV2_6.divideScalar(segmentLengthNext);
                        if (tempV2_4.dot(innerPoint) < segmentLengthPrev && tempV2_6.dot(innerPoint) < segmentLengthNext) {
                            innerSideModified = true;
                        }
                        outerPoint.copy(tempV2_5).add(currentPoint);
                        innerPoint.add(currentPoint);
                        isMiter = false;
                        if (innerSideModified) {
                            if (joinIsOnLeftSide) {
                                nextPointR.copy(innerPoint);
                                currentPointR.copy(innerPoint);
                            } else {
                                nextPointL.copy(innerPoint);
                                currentPointL.copy(innerPoint);
                            }
                        } else {
                            makeSegmentTriangles();
                        }
                        switch(style.strokeLineJoin){
                            case "bevel":
                                makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
                                break;
                            case "round":
                                createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
                                if (joinIsOnLeftSide) {
                                    makeCircularSector(currentPoint, currentPointL, nextPointL, u1, 0);
                                } else {
                                    makeCircularSector(currentPoint, nextPointR, currentPointR, u1, 1);
                                }
                                break;
                            case "miter":
                            case "miter-clip":
                            default:
                                const miterFraction = strokeWidth2 * style.strokeMiterLimit / miterLength2;
                                if (miterFraction < 1) {
                                    if (style.strokeLineJoin !== "miter-clip") {
                                        makeSegmentWithBevelJoin(joinIsOnLeftSide, innerSideModified, u1);
                                        break;
                                    } else {
                                        createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide, innerSideModified);
                                        if (joinIsOnLeftSide) {
                                            tempV2_6.subVectors(outerPoint, currentPointL).multiplyScalar(miterFraction).add(currentPointL);
                                            tempV2_7.subVectors(outerPoint, nextPointL).multiplyScalar(miterFraction).add(nextPointL);
                                            addVertex(currentPointL, u1, 0);
                                            addVertex(tempV2_6, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_6, u1, 0);
                                            addVertex(tempV2_7, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_7, u1, 0);
                                            addVertex(nextPointL, u1, 0);
                                        } else {
                                            tempV2_6.subVectors(outerPoint, currentPointR).multiplyScalar(miterFraction).add(currentPointR);
                                            tempV2_7.subVectors(outerPoint, nextPointR).multiplyScalar(miterFraction).add(nextPointR);
                                            addVertex(currentPointR, u1, 1);
                                            addVertex(tempV2_6, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_6, u1, 1);
                                            addVertex(tempV2_7, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(tempV2_7, u1, 1);
                                            addVertex(nextPointR, u1, 1);
                                        }
                                    }
                                } else {
                                    if (innerSideModified) {
                                        if (joinIsOnLeftSide) {
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(innerPoint, u1, 1);
                                        } else {
                                            addVertex(lastPointR, u0, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(lastPointL, u0, 0);
                                            addVertex(innerPoint, u1, 0);
                                            addVertex(outerPoint, u1, 1);
                                        }
                                        if (joinIsOnLeftSide) {
                                            nextPointL.copy(outerPoint);
                                        } else {
                                            nextPointR.copy(outerPoint);
                                        }
                                    } else {
                                        if (joinIsOnLeftSide) {
                                            addVertex(currentPointL, u1, 0);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(outerPoint, u1, 0);
                                            addVertex(nextPointL, u1, 0);
                                        } else {
                                            addVertex(currentPointR, u1, 1);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(currentPoint, u1, 0.5);
                                            addVertex(outerPoint, u1, 1);
                                            addVertex(nextPointR, u1, 1);
                                        }
                                    }
                                    isMiter = true;
                                }
                                break;
                        }
                    } else {
                        makeSegmentTriangles();
                    }
                } else {
                    makeSegmentTriangles();
                }
                if (!isClosed && iPoint === numPoints - 1) {
                    addCapGeometry(points[0], point0L, point0R, joinIsOnLeftSide, true, u0);
                }
                u0 = u1;
                previousPoint = currentPoint;
                lastPointL.copy(nextPointL);
                lastPointR.copy(nextPointR);
            }
            if (!isClosed) {
                addCapGeometry(currentPoint, currentPointL, currentPointR, joinIsOnLeftSide, false, u1);
            } else if (innerSideModified && vertices) {
                let lastOuter = outerPoint;
                let lastInner = innerPoint;
                if (initialJoinIsOnLeftSide !== joinIsOnLeftSide) {
                    lastOuter = innerPoint;
                    lastInner = outerPoint;
                }
                if (joinIsOnLeftSide) {
                    if (isMiter || initialJoinIsOnLeftSide) {
                        lastInner.toArray(vertices, 0 * 3);
                        lastInner.toArray(vertices, 3 * 3);
                        if (isMiter) {
                            lastOuter.toArray(vertices, 1 * 3);
                        }
                    }
                } else {
                    if (isMiter || !initialJoinIsOnLeftSide) {
                        lastInner.toArray(vertices, 1 * 3);
                        lastInner.toArray(vertices, 3 * 3);
                        if (isMiter) {
                            lastOuter.toArray(vertices, 0 * 3);
                        }
                    }
                }
            }
            return numVertices;
            //TURBOPACK unreachable
            ;
            function getNormal(p1, p2, result) {
                result.subVectors(p2, p1);
                return result.set(-result.y, result.x).normalize();
            }
            function addVertex(position, u, v) {
                if (vertices) {
                    vertices[currentCoordinate] = position.x;
                    vertices[currentCoordinate + 1] = position.y;
                    vertices[currentCoordinate + 2] = 0;
                    if (normals) {
                        normals[currentCoordinate] = 0;
                        normals[currentCoordinate + 1] = 0;
                        normals[currentCoordinate + 2] = 1;
                    }
                    currentCoordinate += 3;
                    if (uvs) {
                        uvs[currentCoordinateUV] = u;
                        uvs[currentCoordinateUV + 1] = v;
                        currentCoordinateUV += 2;
                    }
                }
                numVertices += 3;
            }
            function makeCircularSector(center, p1, p2, u, v) {
                tempV2_1.copy(p1).sub(center).normalize();
                tempV2_2.copy(p2).sub(center).normalize();
                let angle = Math.PI;
                const dot = tempV2_1.dot(tempV2_2);
                if (Math.abs(dot) < 1) angle = Math.abs(Math.acos(dot));
                angle /= arcDivisions;
                tempV2_3.copy(p1);
                for(let i = 0, il = arcDivisions - 1; i < il; i++){
                    tempV2_4.copy(tempV2_3).rotateAround(center, angle);
                    addVertex(tempV2_3, u, v);
                    addVertex(tempV2_4, u, v);
                    addVertex(center, u, 0.5);
                    tempV2_3.copy(tempV2_4);
                }
                addVertex(tempV2_4, u, v);
                addVertex(p2, u, v);
                addVertex(center, u, 0.5);
            }
            function makeSegmentTriangles() {
                addVertex(lastPointR, u0, 1);
                addVertex(lastPointL, u0, 0);
                addVertex(currentPointL, u1, 0);
                addVertex(lastPointR, u0, 1);
                addVertex(currentPointL, u1, 0);
                addVertex(currentPointR, u1, 1);
            }
            function makeSegmentWithBevelJoin(joinIsOnLeftSide2, innerSideModified2, u) {
                if (innerSideModified2) {
                    if (joinIsOnLeftSide2) {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointL, u1, 0);
                        addVertex(lastPointR, u0, 1);
                        addVertex(currentPointL, u1, 0);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPointL, u, 0);
                        addVertex(nextPointL, u, 0);
                        addVertex(innerPoint, u, 0.5);
                    } else {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(currentPointR, u, 1);
                        addVertex(innerPoint, u, 0);
                        addVertex(nextPointR, u, 1);
                    }
                } else {
                    if (joinIsOnLeftSide2) {
                        addVertex(currentPointL, u, 0);
                        addVertex(nextPointL, u, 0);
                        addVertex(currentPoint, u, 0.5);
                    } else {
                        addVertex(currentPointR, u, 1);
                        addVertex(nextPointR, u, 0);
                        addVertex(currentPoint, u, 0.5);
                    }
                }
            }
            function createSegmentTrianglesWithMiddleSection(joinIsOnLeftSide2, innerSideModified2) {
                if (innerSideModified2) {
                    if (joinIsOnLeftSide2) {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointL, u1, 0);
                        addVertex(lastPointR, u0, 1);
                        addVertex(currentPointL, u1, 0);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPointL, u0, 0);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(innerPoint, u1, 1);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(nextPointL, u0, 0);
                        addVertex(innerPoint, u1, 1);
                    } else {
                        addVertex(lastPointR, u0, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(lastPointL, u0, 0);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPointR, u1, 1);
                        addVertex(currentPointR, u0, 1);
                        addVertex(innerPoint, u1, 0);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(currentPoint, u1, 0.5);
                        addVertex(innerPoint, u1, 0);
                        addVertex(nextPointR, u0, 1);
                    }
                }
            }
            function addCapGeometry(center, p1, p2, joinIsOnLeftSide2, start, u) {
                switch(style.strokeLineCap){
                    case "round":
                        if (start) {
                            makeCircularSector(center, p2, p1, u, 0.5);
                        } else {
                            makeCircularSector(center, p1, p2, u, 0.5);
                        }
                        break;
                    case "square":
                        if (start) {
                            tempV2_1.subVectors(p1, center);
                            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
                            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
                            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
                            if (joinIsOnLeftSide2) {
                                tempV2_3.toArray(vertices, 1 * 3);
                                tempV2_4.toArray(vertices, 0 * 3);
                                tempV2_4.toArray(vertices, 3 * 3);
                            } else {
                                tempV2_3.toArray(vertices, 1 * 3);
                                uvs[3 * 2 + 1] === 1 ? tempV2_4.toArray(vertices, 3 * 3) : tempV2_3.toArray(vertices, 3 * 3);
                                tempV2_4.toArray(vertices, 0 * 3);
                            }
                        } else {
                            tempV2_1.subVectors(p2, center);
                            tempV2_2.set(tempV2_1.y, -tempV2_1.x);
                            tempV2_3.addVectors(tempV2_1, tempV2_2).add(center);
                            tempV2_4.subVectors(tempV2_2, tempV2_1).add(center);
                            const vl = vertices.length;
                            if (joinIsOnLeftSide2) {
                                tempV2_3.toArray(vertices, vl - 1 * 3);
                                tempV2_4.toArray(vertices, vl - 2 * 3);
                                tempV2_4.toArray(vertices, vl - 4 * 3);
                            } else {
                                tempV2_4.toArray(vertices, vl - 2 * 3);
                                tempV2_3.toArray(vertices, vl - 1 * 3);
                                tempV2_4.toArray(vertices, vl - 4 * 3);
                            }
                        }
                        break;
                }
            }
            function removeDuplicatedPoints(points2) {
                let dupPoints = false;
                for(let i = 1, n = points2.length - 1; i < n; i++){
                    if (points2[i].distanceTo(points2[i + 1]) < minDistance) {
                        dupPoints = true;
                        break;
                    }
                }
                if (!dupPoints) return points2;
                const newPoints = [];
                newPoints.push(points2[0]);
                for(let i = 1, n = points2.length - 1; i < n; i++){
                    if (points2[i].distanceTo(points2[i + 1]) >= minDistance) {
                        newPoints.push(points2[i]);
                    }
                }
                newPoints.push(points2[points2.length - 1]);
                return newPoints;
            }
        }
    }
    return SVGLoader2;
})();
;
 //# sourceMappingURL=SVGLoader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/effects/AsciiEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsciiEffect",
    ()=>AsciiEffect
]);
class AsciiEffect {
    constructor(renderer, charSet = " .:-=+*#%@", options = {}){
        const fResolution = options["resolution"] || 0.15;
        const iScale = options["scale"] || 1;
        const bColor = options["color"] || false;
        const bAlpha = options["alpha"] || false;
        const bBlock = options["block"] || false;
        const bInvert = options["invert"] || false;
        const strResolution = options["strResolution"] || "low";
        let width, height;
        const domElement = document.createElement("div");
        domElement.style.cursor = "default";
        const oAscii = document.createElement("table");
        domElement.appendChild(oAscii);
        let iWidth, iHeight;
        let oImg;
        this.setSize = function(w, h) {
            width = w;
            height = h;
            renderer.setSize(w, h);
            initAsciiSize();
        };
        this.render = function(scene, camera) {
            renderer.render(scene, camera);
            asciifyImage(oAscii);
        };
        this.domElement = domElement;
        function initAsciiSize() {
            iWidth = Math.floor(width * fResolution);
            iHeight = Math.floor(height * fResolution);
            oCanvas.width = iWidth;
            oCanvas.height = iHeight;
            oImg = renderer.domElement;
            if (oImg.style.backgroundColor) {
                oAscii.rows[0].cells[0].style.backgroundColor = oImg.style.backgroundColor;
                oAscii.rows[0].cells[0].style.color = oImg.style.color;
            }
            oAscii.cellSpacing = 0;
            oAscii.cellPadding = 0;
            const oStyle = oAscii.style;
            oStyle.whiteSpace = "pre";
            oStyle.margin = "0px";
            oStyle.padding = "0px";
            oStyle.letterSpacing = fLetterSpacing + "px";
            oStyle.fontFamily = strFont;
            oStyle.fontSize = fFontSize + "px";
            oStyle.lineHeight = fLineHeight + "px";
            oStyle.textAlign = "left";
            oStyle.textDecoration = "none";
        }
        const aDefaultCharList = " .,:;i1tfLCG08@".split("");
        const aDefaultColorCharList = " CGO08@".split("");
        const strFont = "courier new, monospace";
        const oCanvasImg = renderer.domElement;
        const oCanvas = document.createElement("canvas");
        if (!oCanvas.getContext) {
            return;
        }
        const oCtx = oCanvas.getContext("2d");
        if (!oCtx.getImageData) {
            return;
        }
        let aCharList = bColor ? aDefaultColorCharList : aDefaultCharList;
        if (charSet) aCharList = charSet;
        const fFontSize = 2 / fResolution * iScale;
        const fLineHeight = 2 / fResolution * iScale;
        let fLetterSpacing = 0;
        if (strResolution == "low") {
            switch(iScale){
                case 1:
                    fLetterSpacing = -1;
                    break;
                case 2:
                case 3:
                    fLetterSpacing = -2.1;
                    break;
                case 4:
                    fLetterSpacing = -3.1;
                    break;
                case 5:
                    fLetterSpacing = -4.15;
                    break;
            }
        }
        if (strResolution == "medium") {
            switch(iScale){
                case 1:
                    fLetterSpacing = 0;
                    break;
                case 2:
                    fLetterSpacing = -1;
                    break;
                case 3:
                    fLetterSpacing = -1.04;
                    break;
                case 4:
                case 5:
                    fLetterSpacing = -2.1;
                    break;
            }
        }
        if (strResolution == "high") {
            switch(iScale){
                case 1:
                case 2:
                    fLetterSpacing = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    fLetterSpacing = -1;
                    break;
            }
        }
        function asciifyImage(oAscii2) {
            oCtx.clearRect(0, 0, iWidth, iHeight);
            oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
            const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
            let strChars = "";
            for(let y = 0; y < iHeight; y += 2){
                for(let x = 0; x < iWidth; x++){
                    const iOffset = (y * iWidth + x) * 4;
                    const iRed = oImgData[iOffset];
                    const iGreen = oImgData[iOffset + 1];
                    const iBlue = oImgData[iOffset + 2];
                    const iAlpha = oImgData[iOffset + 3];
                    let iCharIdx;
                    let fBrightness;
                    fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
                    if (iAlpha == 0) {
                        fBrightness = 1;
                    }
                    iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));
                    if (bInvert) {
                        iCharIdx = aCharList.length - iCharIdx - 1;
                    }
                    let strThisChar = aCharList[iCharIdx];
                    if (strThisChar === void 0 || strThisChar == " ") strThisChar = "&nbsp;";
                    if (bColor) {
                        strChars += "<span style='color:rgb(" + iRed + "," + iGreen + "," + iBlue + ");" + (bBlock ? "background-color:rgb(" + iRed + "," + iGreen + "," + iBlue + ");" : "") + (bAlpha ? "opacity:" + iAlpha / 255 + ";" : "") + "'>" + strThisChar + "</span>";
                    } else {
                        strChars += strThisChar;
                    }
                }
                strChars += "<br/>";
            }
            oAscii2.innerHTML = `<tr><td style="display:block;width:${width}px;height:${height}px;overflow:hidden">${strChars}</td></tr>`;
        }
    }
}
;
 //# sourceMappingURL=AsciiEffect.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/DeviceOrientationControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceOrientationControls",
    ()=>DeviceOrientationControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class DeviceOrientationControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    // radians
    constructor(object){
        super();
        __publicField(this, "object");
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "enabled", true);
        __publicField(this, "deviceOrientation", {
            alpha: 0,
            beta: 0,
            gamma: 0
        });
        __publicField(this, "screenOrientation", 0);
        __publicField(this, "alphaOffset", 0);
        __publicField(this, "onDeviceOrientationChangeEvent", (event)=>{
            this.deviceOrientation = event;
        });
        __publicField(this, "onScreenOrientationChangeEvent", ()=>{
            this.screenOrientation = window.orientation || 0;
        });
        // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''
        __publicField(this, "zee", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "euler", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]());
        __publicField(this, "q0", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "q1", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"](-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)));
        // - PI/2 around the x-axis
        __publicField(this, "setObjectQuaternion", (quaternion, alpha, beta, gamma, orient)=>{
            this.euler.set(beta, alpha, -gamma, "YXZ");
            quaternion.setFromEuler(this.euler);
            quaternion.multiply(this.q1);
            quaternion.multiply(this.q0.setFromAxisAngle(this.zee, -orient));
        });
        __publicField(this, "connect", ()=>{
            this.onScreenOrientationChangeEvent();
            if (window.DeviceOrientationEvent !== void 0 && // @ts-ignore
            typeof window.DeviceOrientationEvent.requestPermission === "function") {
                window.DeviceOrientationEvent.requestPermission().then((response)=>{
                    if (response == "granted") {
                        window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent);
                        window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
                    }
                }).catch((error)=>{
                    console.error("THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:", error);
                });
            } else {
                window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent);
                window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
            }
            this.enabled = true;
        });
        __publicField(this, "disconnect", ()=>{
            window.removeEventListener("orientationchange", this.onScreenOrientationChangeEvent);
            window.removeEventListener("deviceorientation", this.onDeviceOrientationChangeEvent);
            this.enabled = false;
        });
        __publicField(this, "lastQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "update", ()=>{
            if (this.enabled === false) return;
            const device = this.deviceOrientation;
            if (device) {
                const alpha = device.alpha ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.alpha) + this.alphaOffset : 0;
                const beta = device.beta ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.beta) : 0;
                const gamma = device.gamma ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(device.gamma) : 0;
                const orient = this.screenOrientation ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(this.screenOrientation) : 0;
                this.setObjectQuaternion(this.object.quaternion, alpha, beta, gamma, orient);
                if (8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
                    this.lastQuaternion.copy(this.object.quaternion);
                    this.dispatchEvent(this.changeEvent);
                }
            }
        });
        __publicField(this, "dispose", ()=>this.disconnect());
        this.object = object;
        this.object.rotation.reorder("YXZ");
        this.connect();
    }
}
;
 //# sourceMappingURL=DeviceOrientationControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/FlyControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlyControls",
    ()=>FlyControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
function contextmenu(event) {
    event.preventDefault();
}
class FlyControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement", null);
        __publicField(this, "movementSpeed", 1);
        __publicField(this, "rollSpeed", 5e-3);
        __publicField(this, "dragToLook", false);
        __publicField(this, "autoForward", false);
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "tmpQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "mouseStatus", 0);
        __publicField(this, "movementSpeedMultiplier", 1);
        __publicField(this, "moveState", {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        });
        __publicField(this, "moveVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "rotationVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "keydown", (event)=>{
            if (event.altKey) {
                return;
            }
            switch(event.code){
                case "ShiftLeft":
                case "ShiftRight":
                    this.movementSpeedMultiplier = 0.1;
                    break;
                case "KeyW":
                    this.moveState.forward = 1;
                    break;
                case "KeyS":
                    this.moveState.back = 1;
                    break;
                case "KeyA":
                    this.moveState.left = 1;
                    break;
                case "KeyD":
                    this.moveState.right = 1;
                    break;
                case "KeyR":
                    this.moveState.up = 1;
                    break;
                case "KeyF":
                    this.moveState.down = 1;
                    break;
                case "ArrowUp":
                    this.moveState.pitchUp = 1;
                    break;
                case "ArrowDown":
                    this.moveState.pitchDown = 1;
                    break;
                case "ArrowLeft":
                    this.moveState.yawLeft = 1;
                    break;
                case "ArrowRight":
                    this.moveState.yawRight = 1;
                    break;
                case "KeyQ":
                    this.moveState.rollLeft = 1;
                    break;
                case "KeyE":
                    this.moveState.rollRight = 1;
                    break;
            }
            this.updateMovementVector();
            this.updateRotationVector();
        });
        __publicField(this, "keyup", (event)=>{
            switch(event.code){
                case "ShiftLeft":
                case "ShiftRight":
                    this.movementSpeedMultiplier = 1;
                    break;
                case "KeyW":
                    this.moveState.forward = 0;
                    break;
                case "KeyS":
                    this.moveState.back = 0;
                    break;
                case "KeyA":
                    this.moveState.left = 0;
                    break;
                case "KeyD":
                    this.moveState.right = 0;
                    break;
                case "KeyR":
                    this.moveState.up = 0;
                    break;
                case "KeyF":
                    this.moveState.down = 0;
                    break;
                case "ArrowUp":
                    this.moveState.pitchUp = 0;
                    break;
                case "ArrowDown":
                    this.moveState.pitchDown = 0;
                    break;
                case "ArrowLeft":
                    this.moveState.yawLeft = 0;
                    break;
                case "ArrowRight":
                    this.moveState.yawRight = 0;
                    break;
                case "KeyQ":
                    this.moveState.rollLeft = 0;
                    break;
                case "KeyE":
                    this.moveState.rollRight = 0;
                    break;
            }
            this.updateMovementVector();
            this.updateRotationVector();
        });
        __publicField(this, "pointerdown", (event)=>{
            if (this.dragToLook) {
                this.mouseStatus++;
            } else {
                switch(event.button){
                    case 0:
                        this.moveState.forward = 1;
                        break;
                    case 2:
                        this.moveState.back = 1;
                        break;
                }
                this.updateMovementVector();
            }
        });
        __publicField(this, "pointermove", (event)=>{
            if (!this.dragToLook || this.mouseStatus > 0) {
                const container = this.getContainerDimensions();
                const halfWidth = container.size[0] / 2;
                const halfHeight = container.size[1] / 2;
                this.moveState.yawLeft = -(event.pageX - container.offset[0] - halfWidth) / halfWidth;
                this.moveState.pitchDown = (event.pageY - container.offset[1] - halfHeight) / halfHeight;
                this.updateRotationVector();
            }
        });
        __publicField(this, "pointerup", (event)=>{
            if (this.dragToLook) {
                this.mouseStatus--;
                this.moveState.yawLeft = this.moveState.pitchDown = 0;
            } else {
                switch(event.button){
                    case 0:
                        this.moveState.forward = 0;
                        break;
                    case 2:
                        this.moveState.back = 0;
                        break;
                }
                this.updateMovementVector();
            }
            this.updateRotationVector();
        });
        __publicField(this, "lastQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "lastPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "update", (delta)=>{
            const moveMult = delta * this.movementSpeed;
            const rotMult = delta * this.rollSpeed;
            this.object.translateX(this.moveVector.x * moveMult);
            this.object.translateY(this.moveVector.y * moveMult);
            this.object.translateZ(this.moveVector.z * moveMult);
            this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
            this.object.quaternion.multiply(this.tmpQuaternion);
            if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS || 8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
                this.dispatchEvent(this.changeEvent);
                this.lastQuaternion.copy(this.object.quaternion);
                this.lastPosition.copy(this.object.position);
            }
        });
        __publicField(this, "updateMovementVector", ()=>{
            const forward = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
            this.moveVector.x = -this.moveState.left + this.moveState.right;
            this.moveVector.y = -this.moveState.down + this.moveState.up;
            this.moveVector.z = -forward + this.moveState.back;
        });
        __publicField(this, "updateRotationVector", ()=>{
            this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
            this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
            this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft;
        });
        __publicField(this, "getContainerDimensions", ()=>{
            if (this.domElement != document && !(this.domElement instanceof Document)) {
                return {
                    size: [
                        this.domElement.offsetWidth,
                        this.domElement.offsetHeight
                    ],
                    offset: [
                        this.domElement.offsetLeft,
                        this.domElement.offsetTop
                    ]
                };
            } else {
                return {
                    size: [
                        window.innerWidth,
                        window.innerHeight
                    ],
                    offset: [
                        0,
                        0
                    ]
                };
            }
        });
        // https://github.com/mrdoob/three.js/issues/20575
        __publicField(this, "connect", (domElement)=>{
            this.domElement = domElement;
            if (!(domElement instanceof Document)) {
                domElement.setAttribute("tabindex", -1);
            }
            this.domElement.addEventListener("contextmenu", contextmenu);
            this.domElement.addEventListener("pointermove", this.pointermove);
            this.domElement.addEventListener("pointerdown", this.pointerdown);
            this.domElement.addEventListener("pointerup", this.pointerup);
            window.addEventListener("keydown", this.keydown);
            window.addEventListener("keyup", this.keyup);
        });
        __publicField(this, "dispose", ()=>{
            this.domElement.removeEventListener("contextmenu", contextmenu);
            this.domElement.removeEventListener("pointermove", this.pointermove);
            this.domElement.removeEventListener("pointerdown", this.pointerdown);
            this.domElement.removeEventListener("pointerup", this.pointerup);
            window.removeEventListener("keydown", this.keydown);
            window.removeEventListener("keyup", this.keyup);
        });
        this.object = object;
        if (domElement !== void 0) this.connect(domElement);
        this.updateMovementVector();
        this.updateRotationVector();
    }
}
;
 //# sourceMappingURL=FlyControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/TrackballControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackballControls",
    ()=>TrackballControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
class TrackballControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "enabled", true);
        __publicField(this, "screen", {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        });
        __publicField(this, "rotateSpeed", 1);
        __publicField(this, "zoomSpeed", 1.2);
        __publicField(this, "panSpeed", 0.3);
        __publicField(this, "noRotate", false);
        __publicField(this, "noZoom", false);
        __publicField(this, "noPan", false);
        __publicField(this, "staticMoving", false);
        __publicField(this, "dynamicDampingFactor", 0.2);
        __publicField(this, "minDistance", 0);
        __publicField(this, "maxDistance", Infinity);
        __publicField(this, "keys", [
            "KeyA",
            "KeyS",
            "KeyD"
        ]);
        __publicField(this, "mouseButtons", {
            LEFT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].ROTATE,
            MIDDLE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].DOLLY,
            RIGHT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOUSE"].PAN
        });
        __publicField(this, "object");
        __publicField(this, "domElement");
        __publicField(this, "cursorZoom", false);
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "mousePosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        // internals
        __publicField(this, "STATE", {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_ZOOM_PAN: 4
        });
        __publicField(this, "EPS", 1e-6);
        __publicField(this, "lastZoom", 1);
        __publicField(this, "lastPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cursorVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "targetVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_state", this.STATE.NONE);
        __publicField(this, "_keyState", this.STATE.NONE);
        __publicField(this, "_eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_movePrev", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_moveCurr", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_lastAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "_lastAngle", 0);
        __publicField(this, "_zoomStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_zoomEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_touchZoomDistanceStart", 0);
        __publicField(this, "_touchZoomDistanceEnd", 0);
        __publicField(this, "_panStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "_panEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "target0");
        __publicField(this, "position0");
        __publicField(this, "up0");
        __publicField(this, "zoom0");
        // events
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "startEvent", {
            type: "start"
        });
        __publicField(this, "endEvent", {
            type: "end"
        });
        __publicField(this, "onScreenVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "getMouseOnScreen", (pageX, pageY)=>{
            this.onScreenVector.set((pageX - this.screen.left) / this.screen.width, (pageY - this.screen.top) / this.screen.height);
            return this.onScreenVector;
        });
        __publicField(this, "onCircleVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "getMouseOnCircle", (pageX, pageY)=>{
            this.onCircleVector.set((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5), (this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width);
            return this.onCircleVector;
        });
        __publicField(this, "axis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "quaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eyeDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "objectUpDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "objectSidewaysDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "moveDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "angle", 0);
        __publicField(this, "rotateCamera", ()=>{
            this.moveDirection.set(this._moveCurr.x - this._movePrev.x, this._moveCurr.y - this._movePrev.y, 0);
            this.angle = this.moveDirection.length();
            if (this.angle) {
                this._eye.copy(this.object.position).sub(this.target);
                this.eyeDirection.copy(this._eye).normalize();
                this.objectUpDirection.copy(this.object.up).normalize();
                this.objectSidewaysDirection.crossVectors(this.objectUpDirection, this.eyeDirection).normalize();
                this.objectUpDirection.setLength(this._moveCurr.y - this._movePrev.y);
                this.objectSidewaysDirection.setLength(this._moveCurr.x - this._movePrev.x);
                this.moveDirection.copy(this.objectUpDirection.add(this.objectSidewaysDirection));
                this.axis.crossVectors(this.moveDirection, this._eye).normalize();
                this.angle *= this.rotateSpeed;
                this.quaternion.setFromAxisAngle(this.axis, this.angle);
                this._eye.applyQuaternion(this.quaternion);
                this.object.up.applyQuaternion(this.quaternion);
                this._lastAxis.copy(this.axis);
                this._lastAngle = this.angle;
            } else if (!this.staticMoving && this._lastAngle) {
                this._lastAngle *= Math.sqrt(1 - this.dynamicDampingFactor);
                this._eye.copy(this.object.position).sub(this.target);
                this.quaternion.setFromAxisAngle(this._lastAxis, this._lastAngle);
                this._eye.applyQuaternion(this.quaternion);
                this.object.up.applyQuaternion(this.quaternion);
            }
            this._movePrev.copy(this._moveCurr);
        });
        __publicField(this, "zoomCamera", ()=>{
            let factor;
            if (this._state === this.STATE.TOUCH_ZOOM_PAN) {
                factor = this._touchZoomDistanceStart / this._touchZoomDistanceEnd;
                this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
                if (this.object.isPerspectiveCamera) {
                    this._eye.multiplyScalar(factor);
                } else if (this.object.isOrthographicCamera) {
                    this.object.zoom /= factor;
                    this.object.updateProjectionMatrix();
                } else {
                    console.warn("THREE.TrackballControls: Unsupported camera type");
                }
            } else {
                factor = 1 + (this._zoomEnd.y - this._zoomStart.y) * this.zoomSpeed;
                if (Math.abs(factor - 1) > this.EPS && factor > 0) {
                    if (this.object.isPerspectiveCamera) {
                        if (factor > 1 && this._eye.length() >= this.maxDistance - this.EPS) {
                            factor = 1;
                        }
                        this._eye.multiplyScalar(factor);
                    } else if (this.object.isOrthographicCamera) {
                        if (factor > 1 && this.object.zoom < this.maxDistance * this.maxDistance) {
                            factor = 1;
                        }
                        this.object.zoom /= factor;
                    } else {
                        console.warn("THREE.TrackballControls: Unsupported camera type");
                    }
                }
                if (this.staticMoving) {
                    this._zoomStart.copy(this._zoomEnd);
                } else {
                    this._zoomStart.y += (this._zoomEnd.y - this._zoomStart.y) * this.dynamicDampingFactor;
                }
                if (this.cursorZoom) {
                    this.targetVector.copy(this.target).project(this.object);
                    let worldPos = this.cursorVector.set(this.mousePosition.x, this.mousePosition.y, this.targetVector.z).unproject(this.object);
                    this.target.lerpVectors(worldPos, this.target, factor);
                }
                if (this.object.isOrthographicCamera) {
                    this.object.updateProjectionMatrix();
                }
            }
        });
        __publicField(this, "mouseChange", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
        __publicField(this, "objectUp", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "pan", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "panCamera", ()=>{
            if (!this.domElement) return;
            this.mouseChange.copy(this._panEnd).sub(this._panStart);
            if (this.mouseChange.lengthSq() > this.EPS) {
                if (this.object.isOrthographicCamera) {
                    const orthoObject = this.object;
                    const scale_x = (orthoObject.right - orthoObject.left) / this.object.zoom;
                    const scale_y = (orthoObject.top - orthoObject.bottom) / this.object.zoom;
                    this.mouseChange.x *= scale_x;
                    this.mouseChange.y *= scale_y;
                } else {
                    this.mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);
                }
                this.pan.copy(this._eye).cross(this.object.up).setLength(this.mouseChange.x);
                this.pan.add(this.objectUp.copy(this.object.up).setLength(this.mouseChange.y));
                this.object.position.add(this.pan);
                this.target.add(this.pan);
                if (this.staticMoving) {
                    this._panStart.copy(this._panEnd);
                } else {
                    this._panStart.add(this.mouseChange.subVectors(this._panEnd, this._panStart).multiplyScalar(this.dynamicDampingFactor));
                }
            }
        });
        __publicField(this, "checkDistances", ()=>{
            if (!this.noZoom || !this.noPan) {
                if (this._eye.lengthSq() > this.maxDistance * this.maxDistance) {
                    this.object.position.addVectors(this.target, this._eye.setLength(this.maxDistance));
                    this._zoomStart.copy(this._zoomEnd);
                }
                if (this._eye.lengthSq() < this.minDistance * this.minDistance) {
                    this.object.position.addVectors(this.target, this._eye.setLength(this.minDistance));
                    this._zoomStart.copy(this._zoomEnd);
                }
            }
        });
        __publicField(this, "handleResize", ()=>{
            if (!this.domElement) return;
            const box = this.domElement.getBoundingClientRect();
            const d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;
        });
        __publicField(this, "update", ()=>{
            this._eye.subVectors(this.object.position, this.target);
            if (!this.noRotate) {
                this.rotateCamera();
            }
            if (!this.noZoom) {
                this.zoomCamera();
            }
            if (!this.noPan) {
                this.panCamera();
            }
            this.object.position.addVectors(this.target, this._eye);
            if (this.object.isPerspectiveCamera) {
                this.checkDistances();
                this.object.lookAt(this.target);
                if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS) {
                    this.dispatchEvent(this.changeEvent);
                    this.lastPosition.copy(this.object.position);
                }
            } else if (this.object.isOrthographicCamera) {
                this.object.lookAt(this.target);
                if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS || this.lastZoom !== this.object.zoom) {
                    this.dispatchEvent(this.changeEvent);
                    this.lastPosition.copy(this.object.position);
                    this.lastZoom = this.object.zoom;
                }
            } else {
                console.warn("THREE.TrackballControls: Unsupported camera type");
            }
        });
        __publicField(this, "reset", ()=>{
            this._state = this.STATE.NONE;
            this._keyState = this.STATE.NONE;
            this.target.copy(this.target0);
            this.object.position.copy(this.position0);
            this.object.up.copy(this.up0);
            this.object.zoom = this.zoom0;
            this.object.updateProjectionMatrix();
            this._eye.subVectors(this.object.position, this.target);
            this.object.lookAt(this.target);
            this.dispatchEvent(this.changeEvent);
            this.lastPosition.copy(this.object.position);
            this.lastZoom = this.object.zoom;
        });
        __publicField(this, "keydown", (event)=>{
            if (this.enabled === false) return;
            window.removeEventListener("keydown", this.keydown);
            if (this._keyState !== this.STATE.NONE) {
                return;
            } else if (event.code === this.keys[this.STATE.ROTATE] && !this.noRotate) {
                this._keyState = this.STATE.ROTATE;
            } else if (event.code === this.keys[this.STATE.ZOOM] && !this.noZoom) {
                this._keyState = this.STATE.ZOOM;
            } else if (event.code === this.keys[this.STATE.PAN] && !this.noPan) {
                this._keyState = this.STATE.PAN;
            }
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseDown(event);
                    break;
            }
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseMove(event);
                    break;
            }
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (this.enabled === false) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.onMouseUp();
                    break;
            }
        });
        __publicField(this, "keyup", ()=>{
            if (this.enabled === false) return;
            this._keyState = this.STATE.NONE;
            window.addEventListener("keydown", this.keydown);
        });
        __publicField(this, "onMouseDown", (event)=>{
            if (!this.domElement) return;
            if (this._state === this.STATE.NONE) {
                switch(event.button){
                    case this.mouseButtons.LEFT:
                        this._state = this.STATE.ROTATE;
                        break;
                    case this.mouseButtons.MIDDLE:
                        this._state = this.STATE.ZOOM;
                        break;
                    case this.mouseButtons.RIGHT:
                        this._state = this.STATE.PAN;
                        break;
                }
            }
            const state = this._keyState !== this.STATE.NONE ? this._keyState : this._state;
            if (state === this.STATE.ROTATE && !this.noRotate) {
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
                this._movePrev.copy(this._moveCurr);
            } else if (state === this.STATE.ZOOM && !this.noZoom) {
                this._zoomStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
                this._zoomEnd.copy(this._zoomStart);
            } else if (state === this.STATE.PAN && !this.noPan) {
                this._panStart.copy(this.getMouseOnScreen(event.pageX, event.pageY));
                this._panEnd.copy(this._panStart);
            }
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
            this.dispatchEvent(this.startEvent);
        });
        __publicField(this, "onMouseMove", (event)=>{
            if (this.enabled === false) return;
            const state = this._keyState !== this.STATE.NONE ? this._keyState : this._state;
            if (state === this.STATE.ROTATE && !this.noRotate) {
                this._movePrev.copy(this._moveCurr);
                this._moveCurr.copy(this.getMouseOnCircle(event.pageX, event.pageY));
            } else if (state === this.STATE.ZOOM && !this.noZoom) {
                this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            } else if (state === this.STATE.PAN && !this.noPan) {
                this._panEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));
            }
        });
        __publicField(this, "onMouseUp", ()=>{
            if (!this.domElement) return;
            if (this.enabled === false) return;
            this._state = this.STATE.NONE;
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "mousewheel", (event)=>{
            if (this.enabled === false) return;
            if (this.noZoom === true) return;
            event.preventDefault();
            switch(event.deltaMode){
                case 2:
                    this._zoomStart.y -= event.deltaY * 0.025;
                    break;
                case 1:
                    this._zoomStart.y -= event.deltaY * 0.01;
                    break;
                default:
                    this._zoomStart.y -= event.deltaY * 25e-5;
                    break;
            }
            this.mousePosition.x = event.offsetX / this.screen.width * 2 - 1;
            this.mousePosition.y = -(event.offsetY / this.screen.height) * 2 + 1;
            this.dispatchEvent(this.startEvent);
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "touchstart", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
            switch(event.touches.length){
                case 1:
                    this._state = this.STATE.TOUCH_ROTATE;
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this._movePrev.copy(this._moveCurr);
                    break;
                default:
                    this._state = this.STATE.TOUCH_ZOOM_PAN;
                    const dx = event.touches[0].pageX - event.touches[1].pageX;
                    const dy = event.touches[0].pageY - event.touches[1].pageY;
                    this._touchZoomDistanceEnd = this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                    const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this._panStart.copy(this.getMouseOnScreen(x, y));
                    this._panEnd.copy(this._panStart);
                    break;
            }
            this.dispatchEvent(this.startEvent);
        });
        __publicField(this, "touchmove", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
            switch(event.touches.length){
                case 1:
                    this._movePrev.copy(this._moveCurr);
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                default:
                    const dx = event.touches[0].pageX - event.touches[1].pageX;
                    const dy = event.touches[0].pageY - event.touches[1].pageY;
                    this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    this._panEnd.copy(this.getMouseOnScreen(x, y));
                    break;
            }
        });
        __publicField(this, "touchend", (event)=>{
            if (this.enabled === false) return;
            switch(event.touches.length){
                case 0:
                    this._state = this.STATE.NONE;
                    break;
                case 1:
                    this._state = this.STATE.TOUCH_ROTATE;
                    this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    this._movePrev.copy(this._moveCurr);
                    break;
            }
            this.dispatchEvent(this.endEvent);
        });
        __publicField(this, "contextmenu", (event)=>{
            if (this.enabled === false) return;
            event.preventDefault();
        });
        // https://github.com/mrdoob/three.js/issues/20575
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.addEventListener("contextmenu", this.contextmenu);
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("wheel", this.mousewheel);
            this.domElement.addEventListener("touchstart", this.touchstart);
            this.domElement.addEventListener("touchend", this.touchend);
            this.domElement.addEventListener("touchmove", this.touchmove);
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
            window.addEventListener("keydown", this.keydown);
            window.addEventListener("keyup", this.keyup);
            this.handleResize();
        });
        __publicField(this, "dispose", ()=>{
            if (!this.domElement) return;
            this.domElement.removeEventListener("contextmenu", this.contextmenu);
            this.domElement.removeEventListener("pointerdown", this.onPointerDown);
            this.domElement.removeEventListener("wheel", this.mousewheel);
            this.domElement.removeEventListener("touchstart", this.touchstart);
            this.domElement.removeEventListener("touchend", this.touchend);
            this.domElement.removeEventListener("touchmove", this.touchmove);
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.domElement.ownerDocument.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("keydown", this.keydown);
            window.removeEventListener("keyup", this.keyup);
        });
        this.object = object;
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.up0 = this.object.up.clone();
        this.zoom0 = this.object.zoom;
        if (domElement !== void 0) this.connect(domElement);
        this.update();
    }
}
;
 //# sourceMappingURL=TrackballControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/ArcballControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArcballControls",
    ()=>ArcballControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const STATE = {
    IDLE: Symbol(),
    ROTATE: Symbol(),
    PAN: Symbol(),
    SCALE: Symbol(),
    FOV: Symbol(),
    FOCUS: Symbol(),
    ZROTATE: Symbol(),
    TOUCH_MULTI: Symbol(),
    ANIMATION_FOCUS: Symbol(),
    ANIMATION_ROTATE: Symbol()
};
const INPUT = {
    NONE: Symbol(),
    ONE_FINGER: Symbol(),
    ONE_FINGER_SWITCHED: Symbol(),
    TWO_FINGER: Symbol(),
    MULT_FINGER: Symbol(),
    CURSOR: Symbol()
};
const _center = {
    x: 0,
    y: 0
};
const _transformation = {
    camera: /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"](),
    gizmos: /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]()
};
const _changeEvent = {
    type: "change"
};
const _startEvent = {
    type: "start"
};
const _endEvent = {
    type: "end"
};
class ArcballControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(camera, domElement = null, scene = null){
        super();
        __publicField(this, "camera");
        __publicField(this, "domElement");
        __publicField(this, "scene");
        __publicField(this, "mouseActions");
        __publicField(this, "_mouseOp");
        __publicField(this, "_v2_1");
        __publicField(this, "_v3_1");
        __publicField(this, "_v3_2");
        __publicField(this, "_m4_1");
        __publicField(this, "_m4_2");
        __publicField(this, "_quat");
        __publicField(this, "_translationMatrix");
        __publicField(this, "_rotationMatrix");
        __publicField(this, "_scaleMatrix");
        __publicField(this, "_rotationAxis");
        __publicField(this, "_cameraMatrixState");
        __publicField(this, "_cameraProjectionState");
        __publicField(this, "_fovState");
        __publicField(this, "_upState");
        __publicField(this, "_zoomState");
        __publicField(this, "_nearPos");
        __publicField(this, "_farPos");
        __publicField(this, "_gizmoMatrixState");
        __publicField(this, "_up0");
        __publicField(this, "_zoom0");
        __publicField(this, "_fov0");
        __publicField(this, "_initialNear");
        __publicField(this, "_nearPos0");
        __publicField(this, "_initialFar");
        __publicField(this, "_farPos0");
        __publicField(this, "_cameraMatrixState0");
        __publicField(this, "_gizmoMatrixState0");
        __publicField(this, "_button");
        __publicField(this, "_touchStart");
        __publicField(this, "_touchCurrent");
        __publicField(this, "_input");
        __publicField(this, "_switchSensibility");
        __publicField(this, "_startFingerDistance");
        __publicField(this, "_currentFingerDistance");
        __publicField(this, "_startFingerRotation");
        __publicField(this, "_currentFingerRotation");
        __publicField(this, "_devPxRatio");
        __publicField(this, "_downValid");
        __publicField(this, "_nclicks");
        __publicField(this, "_downEvents");
        __publicField(this, "_clickStart");
        __publicField(this, "_maxDownTime");
        __publicField(this, "_maxInterval");
        __publicField(this, "_posThreshold");
        __publicField(this, "_movementThreshold");
        __publicField(this, "_currentCursorPosition");
        __publicField(this, "_startCursorPosition");
        __publicField(this, "_grid");
        __publicField(this, "_gridPosition");
        __publicField(this, "_gizmos");
        __publicField(this, "_curvePts");
        __publicField(this, "_timeStart");
        __publicField(this, "_animationId");
        __publicField(this, "focusAnimationTime");
        __publicField(this, "_timePrev");
        __publicField(this, "_timeCurrent");
        __publicField(this, "_anglePrev");
        __publicField(this, "_angleCurrent");
        __publicField(this, "_cursorPosPrev");
        __publicField(this, "_cursorPosCurr");
        __publicField(this, "_wPrev");
        __publicField(this, "_wCurr");
        __publicField(this, "adjustNearFar");
        __publicField(this, "scaleFactor");
        __publicField(this, "dampingFactor");
        __publicField(this, "wMax");
        __publicField(this, "enableAnimations");
        __publicField(this, "enableGrid");
        __publicField(this, "cursorZoom");
        __publicField(this, "minFov");
        __publicField(this, "maxFov");
        __publicField(this, "enabled");
        __publicField(this, "enablePan");
        __publicField(this, "enableRotate");
        __publicField(this, "enableZoom");
        __publicField(this, "minDistance");
        __publicField(this, "maxDistance");
        __publicField(this, "minZoom");
        __publicField(this, "maxZoom");
        __publicField(this, "target");
        __publicField(this, "_currentTarget");
        __publicField(this, "_tbRadius");
        __publicField(this, "_state");
        //listeners
        __publicField(this, "onWindowResize", ()=>{
            const scale = (this._gizmos.scale.x + this._gizmos.scale.y + this._gizmos.scale.z) / 3;
            if (this.camera) {
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
            }
            const newRadius = this._tbRadius / scale;
            const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, newRadius, newRadius);
            const points = curve.getPoints(this._curvePts);
            const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
            for(const gizmo in this._gizmos.children){
                const child = this._gizmos.children[gizmo];
                child.geometry = curveGeometry;
            }
            this.dispatchEvent(_changeEvent);
        });
        __publicField(this, "onContextMenu", (event)=>{
            if (!this.enabled) {
                return;
            }
            for(let i = 0; i < this.mouseActions.length; i++){
                if (this.mouseActions[i].mouse == 2) {
                    event.preventDefault();
                    break;
                }
            }
        });
        __publicField(this, "onPointerCancel", ()=>{
            this._touchStart.splice(0, this._touchStart.length);
            this._touchCurrent.splice(0, this._touchCurrent.length);
            this._input = INPUT.NONE;
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (event.button == 0 && event.isPrimary) {
                this._downValid = true;
                this._downEvents.push(event);
            } else {
                this._downValid = false;
            }
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                this._touchStart.push(event);
                this._touchCurrent.push(event);
                switch(this._input){
                    case INPUT.NONE:
                        this._input = INPUT.ONE_FINGER;
                        this.onSinglePanStart(event, "ROTATE");
                        window.addEventListener("pointermove", this.onPointerMove);
                        window.addEventListener("pointerup", this.onPointerUp);
                        break;
                    case INPUT.ONE_FINGER:
                    case INPUT.ONE_FINGER_SWITCHED:
                        this._input = INPUT.TWO_FINGER;
                        this.onRotateStart();
                        this.onPinchStart();
                        this.onDoublePanStart();
                        break;
                    case INPUT.TWO_FINGER:
                        this._input = INPUT.MULT_FINGER;
                        this.onTriplePanStart();
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.NONE) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                this._mouseOp = this.getOpFromAction(event.button, modifier);
                if (this._mouseOp) {
                    window.addEventListener("pointermove", this.onPointerMove);
                    window.addEventListener("pointerup", this.onPointerUp);
                    this._input = INPUT.CURSOR;
                    this._button = event.button;
                    this.onSinglePanStart(event, this._mouseOp);
                }
            }
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                switch(this._input){
                    case INPUT.ONE_FINGER:
                        this.updateTouchEvent(event);
                        this.onSinglePanMove(event, STATE.ROTATE);
                        break;
                    case INPUT.ONE_FINGER_SWITCHED:
                        const movement = this.calculatePointersDistance(this._touchCurrent[0], event) * this._devPxRatio;
                        if (movement >= this._switchSensibility) {
                            this._input = INPUT.ONE_FINGER;
                            this.updateTouchEvent(event);
                            this.onSinglePanStart(event, "ROTATE");
                            break;
                        }
                        break;
                    case INPUT.TWO_FINGER:
                        this.updateTouchEvent(event);
                        this.onRotateMove();
                        this.onPinchMove();
                        this.onDoublePanMove();
                        break;
                    case INPUT.MULT_FINGER:
                        this.updateTouchEvent(event);
                        this.onTriplePanMove();
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.CURSOR) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                const mouseOpState = this.getOpStateFromAction(this._button, modifier);
                if (mouseOpState) {
                    this.onSinglePanMove(event, mouseOpState);
                }
            }
            if (this._downValid) {
                const movement = this.calculatePointersDistance(this._downEvents[this._downEvents.length - 1], event) * this._devPxRatio;
                if (movement > this._movementThreshold) {
                    this._downValid = false;
                }
            }
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (event.pointerType == "touch" && this._input != INPUT.CURSOR) {
                const nTouch = this._touchCurrent.length;
                for(let i = 0; i < nTouch; i++){
                    if (this._touchCurrent[i].pointerId == event.pointerId) {
                        this._touchCurrent.splice(i, 1);
                        this._touchStart.splice(i, 1);
                        break;
                    }
                }
                switch(this._input){
                    case INPUT.ONE_FINGER:
                    case INPUT.ONE_FINGER_SWITCHED:
                        window.removeEventListener("pointermove", this.onPointerMove);
                        window.removeEventListener("pointerup", this.onPointerUp);
                        this._input = INPUT.NONE;
                        this.onSinglePanEnd();
                        break;
                    case INPUT.TWO_FINGER:
                        this.onDoublePanEnd();
                        this.onPinchEnd();
                        this.onRotateEnd();
                        this._input = INPUT.ONE_FINGER_SWITCHED;
                        break;
                    case INPUT.MULT_FINGER:
                        if (this._touchCurrent.length == 0) {
                            window.removeEventListener("pointermove", this.onPointerMove);
                            window.removeEventListener("pointerup", this.onPointerUp);
                            this._input = INPUT.NONE;
                            this.onTriplePanEnd();
                        }
                        break;
                }
            } else if (event.pointerType != "touch" && this._input == INPUT.CURSOR) {
                window.removeEventListener("pointermove", this.onPointerMove);
                window.removeEventListener("pointerup", this.onPointerUp);
                this._input = INPUT.NONE;
                this.onSinglePanEnd();
                this._button = -1;
            }
            if (event.isPrimary) {
                if (this._downValid) {
                    const downTime = event.timeStamp - this._downEvents[this._downEvents.length - 1].timeStamp;
                    if (downTime <= this._maxDownTime) {
                        if (this._nclicks == 0) {
                            this._nclicks = 1;
                            this._clickStart = performance.now();
                        } else {
                            const clickInterval = event.timeStamp - this._clickStart;
                            const movement = this.calculatePointersDistance(this._downEvents[1], this._downEvents[0]) * this._devPxRatio;
                            if (clickInterval <= this._maxInterval && movement <= this._posThreshold) {
                                this._nclicks = 0;
                                this._downEvents.splice(0, this._downEvents.length);
                                this.onDoubleTap(event);
                            } else {
                                this._nclicks = 1;
                                this._downEvents.shift();
                                this._clickStart = performance.now();
                            }
                        }
                    } else {
                        this._downValid = false;
                        this._nclicks = 0;
                        this._downEvents.splice(0, this._downEvents.length);
                    }
                } else {
                    this._nclicks = 0;
                    this._downEvents.splice(0, this._downEvents.length);
                }
            }
        });
        __publicField(this, "onWheel", (event)=>{
            var _a, _b;
            if (this.enabled && this.enableZoom && this.domElement) {
                let modifier = null;
                if (event.ctrlKey || event.metaKey) {
                    modifier = "CTRL";
                } else if (event.shiftKey) {
                    modifier = "SHIFT";
                }
                const mouseOp = this.getOpFromAction("WHEEL", modifier);
                if (mouseOp) {
                    event.preventDefault();
                    this.dispatchEvent(_startEvent);
                    const notchDeltaY = 125;
                    let sgn = event.deltaY / notchDeltaY;
                    let size = 1;
                    if (sgn > 0) {
                        size = 1 / this.scaleFactor;
                    } else if (sgn < 0) {
                        size = this.scaleFactor;
                    }
                    switch(mouseOp){
                        case "ZOOM":
                            this.updateTbState(STATE.SCALE, true);
                            if (sgn > 0) {
                                size = 1 / Math.pow(this.scaleFactor, sgn);
                            } else if (sgn < 0) {
                                size = Math.pow(this.scaleFactor, -sgn);
                            }
                            if (this.cursorZoom && this.enablePan) {
                                let scalePoint;
                                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                                    scalePoint = (_a = this.unprojectOnTbPlane(this.camera, event.clientX, event.clientY, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._gizmos.position);
                                }
                                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                                    scalePoint = (_b = this.unprojectOnTbPlane(this.camera, event.clientX, event.clientY, this.domElement)) == null ? void 0 : _b.applyQuaternion(this.camera.quaternion).add(this._gizmos.position);
                                }
                                if (scalePoint !== void 0) this.applyTransformMatrix(this.applyScale(size, scalePoint));
                            } else {
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                            }
                            if (this._grid) {
                                this.disposeGrid();
                                this.drawGrid();
                            }
                            this.updateTbState(STATE.IDLE, false);
                            this.dispatchEvent(_changeEvent);
                            this.dispatchEvent(_endEvent);
                            break;
                        case "FOV":
                            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                                this.updateTbState(STATE.FOV, true);
                                if (event.deltaX != 0) {
                                    sgn = event.deltaX / notchDeltaY;
                                    size = 1;
                                    if (sgn > 0) {
                                        size = 1 / Math.pow(this.scaleFactor, sgn);
                                    } else if (sgn < 0) {
                                        size = Math.pow(this.scaleFactor, -sgn);
                                    }
                                }
                                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                                const x = this._v3_1.distanceTo(this._gizmos.position);
                                let xNew = x / size;
                                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this.camera.fov * 0.5);
                                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                                if (newFov > this.maxFov) {
                                    newFov = this.maxFov;
                                } else if (newFov < this.minFov) {
                                    newFov = this.minFov;
                                }
                                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                                size = x / newDistance;
                                this.setFov(newFov);
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position, false));
                            }
                            if (this._grid) {
                                this.disposeGrid();
                                this.drawGrid();
                            }
                            this.updateTbState(STATE.IDLE, false);
                            this.dispatchEvent(_changeEvent);
                            this.dispatchEvent(_endEvent);
                            break;
                    }
                }
            }
        });
        __publicField(this, "onSinglePanStart", (event, operation)=>{
            if (this.enabled && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.setCenter(event.clientX, event.clientY);
                switch(operation){
                    case "PAN":
                        if (!this.enablePan) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                            this.activateGizmos(false);
                            this.dispatchEvent(_changeEvent);
                        }
                        if (this.camera) {
                            this.updateTbState(STATE.PAN, true);
                            const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                            if (rayDir !== void 0) {
                                this._startCursorPosition.copy(rayDir);
                            }
                            if (this.enableGrid) {
                                this.drawGrid();
                                this.dispatchEvent(_changeEvent);
                            }
                        }
                        break;
                    case "ROTATE":
                        if (!this.enableRotate) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                        }
                        if (this.camera) {
                            this.updateTbState(STATE.ROTATE, true);
                            const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                            if (rayDir !== void 0) {
                                this._startCursorPosition.copy(rayDir);
                            }
                            this.activateGizmos(true);
                            if (this.enableAnimations) {
                                this._timePrev = this._timeCurrent = performance.now();
                                this._angleCurrent = this._anglePrev = 0;
                                this._cursorPosPrev.copy(this._startCursorPosition);
                                this._cursorPosCurr.copy(this._cursorPosPrev);
                                this._wCurr = 0;
                                this._wPrev = this._wCurr;
                            }
                        }
                        this.dispatchEvent(_changeEvent);
                        break;
                    case "FOV":
                        if (!this.enableZoom) return;
                        if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                            if (this._animationId != -1) {
                                cancelAnimationFrame(this._animationId);
                                this._animationId = -1;
                                this._timeStart = -1;
                                this.activateGizmos(false);
                                this.dispatchEvent(_changeEvent);
                            }
                            this.updateTbState(STATE.FOV, true);
                            this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                            this._currentCursorPosition.copy(this._startCursorPosition);
                        }
                        break;
                    case "ZOOM":
                        if (!this.enableZoom) return;
                        if (this._animationId != -1) {
                            cancelAnimationFrame(this._animationId);
                            this._animationId = -1;
                            this._timeStart = -1;
                            this.activateGizmos(false);
                            this.dispatchEvent(_changeEvent);
                        }
                        this.updateTbState(STATE.SCALE, true);
                        this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                        this._currentCursorPosition.copy(this._startCursorPosition);
                        break;
                }
            }
        });
        __publicField(this, "onSinglePanMove", (event, opState)=>{
            if (this.enabled && this.domElement) {
                const restart = opState != this._state;
                this.setCenter(event.clientX, event.clientY);
                switch(opState){
                    case STATE.PAN:
                        if (this.enablePan && this.camera) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                                if (rayDir !== void 0) {
                                    this._startCursorPosition.copy(rayDir);
                                }
                                if (this.enableGrid) {
                                    this.drawGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement);
                                if (rayDir !== void 0) {
                                    this._currentCursorPosition.copy(rayDir);
                                }
                                this.applyTransformMatrix(this.pan(this._startCursorPosition, this._currentCursorPosition));
                            }
                        }
                        break;
                    case STATE.ROTATE:
                        if (this.enableRotate && this.camera) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                                if (rayDir !== void 0) {
                                    this._startCursorPosition.copy(rayDir);
                                }
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(true);
                            } else {
                                const rayDir = this.unprojectOnTbSurface(this.camera, _center.x, _center.y, this.domElement, this._tbRadius);
                                if (rayDir !== void 0) {
                                    this._currentCursorPosition.copy(rayDir);
                                }
                                const distance = this._startCursorPosition.distanceTo(this._currentCursorPosition);
                                const angle = this._startCursorPosition.angleTo(this._currentCursorPosition);
                                const amount = Math.max(distance / this._tbRadius, angle);
                                this.applyTransformMatrix(this.rotate(this.calculateRotationAxis(this._startCursorPosition, this._currentCursorPosition), amount));
                                if (this.enableAnimations) {
                                    this._timePrev = this._timeCurrent;
                                    this._timeCurrent = performance.now();
                                    this._anglePrev = this._angleCurrent;
                                    this._angleCurrent = amount;
                                    this._cursorPosPrev.copy(this._cursorPosCurr);
                                    this._cursorPosCurr.copy(this._currentCursorPosition);
                                    this._wPrev = this._wCurr;
                                    this._wCurr = this.calculateAngularSpeed(this._anglePrev, this._angleCurrent, this._timePrev, this._timeCurrent);
                                }
                            }
                        }
                        break;
                    case STATE.SCALE:
                        if (this.enableZoom) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                this._currentCursorPosition.copy(this._startCursorPosition);
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const screenNotches = 8;
                                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                                let size = 1;
                                if (movement < 0) {
                                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                                } else if (movement > 0) {
                                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                                }
                                this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                            }
                        }
                        break;
                    case STATE.FOV:
                        if (this.enableZoom && this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                            if (restart) {
                                this.dispatchEvent(_endEvent);
                                this.dispatchEvent(_startEvent);
                                this.updateTbState(opState, true);
                                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                this._currentCursorPosition.copy(this._startCursorPosition);
                                if (this.enableGrid) {
                                    this.disposeGrid();
                                }
                                this.activateGizmos(false);
                            } else {
                                const screenNotches = 8;
                                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                                let size = 1;
                                if (movement < 0) {
                                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                                } else if (movement > 0) {
                                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                                }
                                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                                const x = this._v3_1.distanceTo(this._gizmos.position);
                                let xNew = x / size;
                                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this._fovState * 0.5);
                                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                                newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(newFov, this.minFov, this.maxFov);
                                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                                size = x / newDistance;
                                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                                this.setFov(newFov);
                                this.applyTransformMatrix(this.applyScale(size, this._v3_2, false));
                                const direction = this._gizmos.position.clone().sub(this.camera.position).normalize().multiplyScalar(newDistance / x);
                                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                            }
                        }
                        break;
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onSinglePanEnd", ()=>{
            if (this._state == STATE.ROTATE) {
                if (!this.enableRotate) {
                    return;
                }
                if (this.enableAnimations) {
                    const deltaTime = performance.now() - this._timeCurrent;
                    if (deltaTime < 120) {
                        const w = Math.abs((this._wPrev + this._wCurr) / 2);
                        const self = this;
                        this._animationId = window.requestAnimationFrame(function(t) {
                            self.updateTbState(STATE.ANIMATION_ROTATE, true);
                            const rotationAxis = self.calculateRotationAxis(self._cursorPosPrev, self._cursorPosCurr);
                            self.onRotationAnim(t, rotationAxis, Math.min(w, self.wMax));
                        });
                    } else {
                        this.updateTbState(STATE.IDLE, false);
                        this.activateGizmos(false);
                        this.dispatchEvent(_changeEvent);
                    }
                } else {
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            } else if (this._state == STATE.PAN || this._state == STATE.IDLE) {
                this.updateTbState(STATE.IDLE, false);
                if (this.enableGrid) {
                    this.disposeGrid();
                }
                this.activateGizmos(false);
                this.dispatchEvent(_changeEvent);
            }
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onDoubleTap", (event)=>{
            if (this.enabled && this.enablePan && this.scene && this.camera && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.setCenter(event.clientX, event.clientY);
                const hitP = this.unprojectOnObj(this.getCursorNDC(_center.x, _center.y, this.domElement), this.camera);
                if (hitP && this.enableAnimations) {
                    const self = this;
                    if (this._animationId != -1) {
                        window.cancelAnimationFrame(this._animationId);
                    }
                    this._timeStart = -1;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.updateTbState(STATE.ANIMATION_FOCUS, true);
                        self.onFocusAnim(t, hitP, self._cameraMatrixState, self._gizmoMatrixState);
                    });
                } else if (hitP && !this.enableAnimations) {
                    this.updateTbState(STATE.FOCUS, true);
                    this.focus(hitP, this.scaleFactor);
                    this.updateTbState(STATE.IDLE, false);
                    this.dispatchEvent(_changeEvent);
                }
            }
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onDoublePanStart", ()=>{
            if (this.enabled && this.enablePan && this.camera && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.PAN, true);
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement, true);
                if (rayDir !== void 0) {
                    this._startCursorPosition.copy(rayDir);
                }
                this._currentCursorPosition.copy(this._startCursorPosition);
                this.activateGizmos(false);
            }
        });
        __publicField(this, "onDoublePanMove", ()=>{
            if (this.enabled && this.enablePan && this.camera && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                if (this._state != STATE.PAN) {
                    this.updateTbState(STATE.PAN, true);
                    this._startCursorPosition.copy(this._currentCursorPosition);
                }
                const rayDir = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement, true);
                if (rayDir !== void 0) this._currentCursorPosition.copy(rayDir);
                this.applyTransformMatrix(this.pan(this._startCursorPosition, this._currentCursorPosition, true));
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onDoublePanEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onRotateStart", ()=>{
            var _a;
            if (this.enabled && this.enableRotate) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.ZROTATE, true);
                this._startFingerRotation = this.getAngle(this._touchCurrent[1], this._touchCurrent[0]) + this.getAngle(this._touchStart[1], this._touchStart[0]);
                this._currentFingerRotation = this._startFingerRotation;
                (_a = this.camera) == null ? void 0 : _a.getWorldDirection(this._rotationAxis);
                if (!this.enablePan && !this.enableZoom) {
                    this.activateGizmos(true);
                }
            }
        });
        __publicField(this, "onRotateMove", ()=>{
            var _a;
            if (this.enabled && this.enableRotate && this.camera && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                let rotationPoint;
                if (this._state != STATE.ZROTATE) {
                    this.updateTbState(STATE.ZROTATE, true);
                    this._startFingerRotation = this._currentFingerRotation;
                }
                this._currentFingerRotation = this.getAngle(this._touchCurrent[1], this._touchCurrent[0]) + this.getAngle(this._touchStart[1], this._touchStart[0]);
                if (!this.enablePan) {
                    rotationPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromMatrixPosition(this._gizmoMatrixState);
                } else if (this.camera) {
                    this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                    rotationPoint = (_a = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._v3_2);
                }
                const amount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (this._startFingerRotation - this._currentFingerRotation);
                if (rotationPoint !== void 0) {
                    this.applyTransformMatrix(this.zRotate(rotationPoint, amount));
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onRotateEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.activateGizmos(false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onPinchStart", ()=>{
            if (this.enabled && this.enableZoom) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.SCALE, true);
                this._startFingerDistance = this.calculatePointersDistance(this._touchCurrent[0], this._touchCurrent[1]);
                this._currentFingerDistance = this._startFingerDistance;
                this.activateGizmos(false);
            }
        });
        __publicField(this, "onPinchMove", ()=>{
            var _a, _b;
            if (this.enabled && this.enableZoom && this.domElement) {
                this.setCenter((this._touchCurrent[0].clientX + this._touchCurrent[1].clientX) / 2, (this._touchCurrent[0].clientY + this._touchCurrent[1].clientY) / 2);
                const minDistance = 12;
                if (this._state != STATE.SCALE) {
                    this._startFingerDistance = this._currentFingerDistance;
                    this.updateTbState(STATE.SCALE, true);
                }
                this._currentFingerDistance = Math.max(this.calculatePointersDistance(this._touchCurrent[0], this._touchCurrent[1]), minDistance * this._devPxRatio);
                const amount = this._currentFingerDistance / this._startFingerDistance;
                let scalePoint;
                if (!this.enablePan) {
                    scalePoint = this._gizmos.position;
                } else {
                    if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                        scalePoint = (_a = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _a.applyQuaternion(this.camera.quaternion).multiplyScalar(1 / this.camera.zoom).add(this._gizmos.position);
                    } else if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                        scalePoint = (_b = this.unprojectOnTbPlane(this.camera, _center.x, _center.y, this.domElement)) == null ? void 0 : _b.applyQuaternion(this.camera.quaternion).add(this._gizmos.position);
                    }
                }
                if (scalePoint !== void 0) {
                    this.applyTransformMatrix(this.applyScale(amount, scalePoint));
                }
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onPinchEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        __publicField(this, "onTriplePanStart", ()=>{
            if (this.enabled && this.enableZoom && this.domElement) {
                this.dispatchEvent(_startEvent);
                this.updateTbState(STATE.SCALE, true);
                let clientX = 0;
                let clientY = 0;
                const nFingers = this._touchCurrent.length;
                for(let i = 0; i < nFingers; i++){
                    clientX += this._touchCurrent[i].clientX;
                    clientY += this._touchCurrent[i].clientY;
                }
                this.setCenter(clientX / nFingers, clientY / nFingers);
                this._startCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                this._currentCursorPosition.copy(this._startCursorPosition);
            }
        });
        __publicField(this, "onTriplePanMove", ()=>{
            if (this.enabled && this.enableZoom && this.camera && this.domElement) {
                let clientX = 0;
                let clientY = 0;
                const nFingers = this._touchCurrent.length;
                for(let i = 0; i < nFingers; i++){
                    clientX += this._touchCurrent[i].clientX;
                    clientY += this._touchCurrent[i].clientY;
                }
                this.setCenter(clientX / nFingers, clientY / nFingers);
                const screenNotches = 8;
                this._currentCursorPosition.setY(this.getCursorNDC(_center.x, _center.y, this.domElement).y * 0.5);
                const movement = this._currentCursorPosition.y - this._startCursorPosition.y;
                let size = 1;
                if (movement < 0) {
                    size = 1 / Math.pow(this.scaleFactor, -movement * screenNotches);
                } else if (movement > 0) {
                    size = Math.pow(this.scaleFactor, movement * screenNotches);
                }
                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                const x = this._v3_1.distanceTo(this._gizmos.position);
                let xNew = x / size;
                xNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(xNew, this.minDistance, this.maxDistance);
                const y = x * Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this._fovState * 0.5);
                let newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * (Math.atan(y / xNew) * 2);
                newFov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(newFov, this.minFov, this.maxFov);
                const newDistance = y / Math.tan(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * (newFov / 2));
                size = x / newDistance;
                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                this.setFov(newFov);
                this.applyTransformMatrix(this.applyScale(size, this._v3_2, false));
                const direction = this._gizmos.position.clone().sub(this.camera.position).normalize().multiplyScalar(newDistance / x);
                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                this.dispatchEvent(_changeEvent);
            }
        });
        __publicField(this, "onTriplePanEnd", ()=>{
            this.updateTbState(STATE.IDLE, false);
            this.dispatchEvent(_endEvent);
        });
        /**
     * Set _center's x/y coordinates
     * @param {Number} clientX
     * @param {Number} clientY
     */ __publicField(this, "setCenter", (clientX, clientY)=>{
            _center.x = clientX;
            _center.y = clientY;
        });
        /**
     * Set default mouse actions
     */ __publicField(this, "initializeMouseActions", ()=>{
            this.setMouseAction("PAN", 0, "CTRL");
            this.setMouseAction("PAN", 2);
            this.setMouseAction("ROTATE", 0);
            this.setMouseAction("ZOOM", "WHEEL");
            this.setMouseAction("ZOOM", 1);
            this.setMouseAction("FOV", "WHEEL", "SHIFT");
            this.setMouseAction("FOV", 1, "SHIFT");
        });
        /**
     * Set a new mouse action by specifying the operation to be performed and a mouse/key combination. In case of conflict, replaces the existing one
     * @param {String} operation The operation to be performed ('PAN', 'ROTATE', 'ZOOM', 'FOV)
     * @param {*} mouse A mouse button (0, 1, 2) or 'WHEEL' for wheel notches
     * @param {*} key The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed
     * @returns {Boolean} True if the mouse action has been successfully added, false otherwise
     */ __publicField(this, "setMouseAction", (operation, mouse, key = null)=>{
            const operationInput = [
                "PAN",
                "ROTATE",
                "ZOOM",
                "FOV"
            ];
            const mouseInput = [
                0,
                1,
                2,
                "WHEEL"
            ];
            const keyInput = [
                "CTRL",
                "SHIFT",
                null
            ];
            let state;
            if (!operationInput.includes(operation) || !mouseInput.includes(mouse) || !keyInput.includes(key)) {
                return false;
            }
            if (mouse == "WHEEL") {
                if (operation != "ZOOM" && operation != "FOV") {
                    return false;
                }
            }
            switch(operation){
                case "PAN":
                    state = STATE.PAN;
                    break;
                case "ROTATE":
                    state = STATE.ROTATE;
                    break;
                case "ZOOM":
                    state = STATE.SCALE;
                    break;
                case "FOV":
                    state = STATE.FOV;
                    break;
            }
            const action = {
                operation,
                mouse,
                key,
                state
            };
            for(let i = 0; i < this.mouseActions.length; i++){
                if (this.mouseActions[i].mouse == action.mouse && this.mouseActions[i].key == action.key) {
                    this.mouseActions.splice(i, 1, action);
                    return true;
                }
            }
            this.mouseActions.push(action);
            return true;
        });
        /**
     * Return the operation associated to a mouse/keyboard combination
     * @param {*} mouse A mouse button (0, 1, 2) or 'WHEEL' for wheel notches
     * @param {*} key The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed
     * @returns The operation if it has been found, null otherwise
     */ __publicField(this, "getOpFromAction", (mouse, key)=>{
            let action;
            for(let i = 0; i < this.mouseActions.length; i++){
                action = this.mouseActions[i];
                if (action.mouse == mouse && action.key == key) {
                    return action.operation;
                }
            }
            if (key) {
                for(let i = 0; i < this.mouseActions.length; i++){
                    action = this.mouseActions[i];
                    if (action.mouse == mouse && action.key == null) {
                        return action.operation;
                    }
                }
            }
            return null;
        });
        /**
     * Get the operation associated to mouse and key combination and returns the corresponding FSA state
     * @param {Number} mouse Mouse button
     * @param {String} key Keyboard modifier
     * @returns The FSA state obtained from the operation associated to mouse/keyboard combination
     */ __publicField(this, "getOpStateFromAction", (mouse, key)=>{
            let action;
            for(let i = 0; i < this.mouseActions.length; i++){
                action = this.mouseActions[i];
                if (action.mouse == mouse && action.key == key) {
                    return action.state;
                }
            }
            if (key) {
                for(let i = 0; i < this.mouseActions.length; i++){
                    action = this.mouseActions[i];
                    if (action.mouse == mouse && action.key == null) {
                        return action.state;
                    }
                }
            }
            return null;
        });
        /**
     * Calculate the angle between two pointers
     * @param {PointerEvent} p1
     * @param {PointerEvent} p2
     * @returns {Number} The angle between two pointers in degrees
     */ __publicField(this, "getAngle", (p1, p2)=>{
            return Math.atan2(p2.clientY - p1.clientY, p2.clientX - p1.clientX) * 180 / Math.PI;
        });
        /**
     * Update a PointerEvent inside current pointerevents array
     * @param {PointerEvent} event
     */ __publicField(this, "updateTouchEvent", (event)=>{
            for(let i = 0; i < this._touchCurrent.length; i++){
                if (this._touchCurrent[i].pointerId == event.pointerId) {
                    this._touchCurrent.splice(i, 1, event);
                    break;
                }
            }
        });
        /**
     * Calculate the angular speed
     * @param {Number} p0 Position at t0
     * @param {Number} p1 Position at t1
     * @param {Number} t0 Initial time in milliseconds
     * @param {Number} t1 Ending time in milliseconds
     */ __publicField(this, "calculateAngularSpeed", (p0, p1, t0, t1)=>{
            const s = p1 - p0;
            const t = (t1 - t0) / 1e3;
            if (t == 0) {
                return 0;
            }
            return s / t;
        });
        /**
     * Calculate the distance between two pointers
     * @param {PointerEvent} p0 The first pointer
     * @param {PointerEvent} p1 The second pointer
     * @returns {number} The distance between the two pointers
     */ __publicField(this, "calculatePointersDistance", (p0, p1)=>{
            return Math.sqrt(Math.pow(p1.clientX - p0.clientX, 2) + Math.pow(p1.clientY - p0.clientY, 2));
        });
        /**
     * Calculate the rotation axis as the vector perpendicular between two vectors
     * @param {Vector3} vec1 The first vector
     * @param {Vector3} vec2 The second vector
     * @returns {Vector3} The normalized rotation axis
     */ __publicField(this, "calculateRotationAxis", (vec1, vec2)=>{
            this._rotationMatrix.extractRotation(this._cameraMatrixState);
            this._quat.setFromRotationMatrix(this._rotationMatrix);
            this._rotationAxis.crossVectors(vec1, vec2).applyQuaternion(this._quat);
            return this._rotationAxis.normalize().clone();
        });
        /**
     * Calculate the trackball radius so that gizmo's diamater will be 2/3 of the minimum side of the camera frustum
     * @param {Camera} camera
     * @returns {Number} The trackball radius
     */ __publicField(this, "calculateTbRadius", (camera)=>{
            const factor = 0.67;
            const distance = camera.position.distanceTo(this._gizmos.position);
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                const halfFovV = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * camera.fov * 0.5;
                const halfFovH = Math.atan(camera.aspect * Math.tan(halfFovV));
                return Math.tan(Math.min(halfFovV, halfFovH)) * distance * factor;
            } else if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                return Math.min(camera.top, camera.right) * factor;
            }
        });
        /**
     * Focus operation consist of positioning the point of interest in front of the camera and a slightly zoom in
     * @param {Vector3} point The point of interest
     * @param {Number} size Scale factor
     * @param {Number} amount Amount of operation to be completed (used for focus animations, default is complete full operation)
     */ __publicField(this, "focus", (point, size, amount = 1)=>{
            if (this.camera) {
                const focusPoint = point.clone();
                focusPoint.sub(this._gizmos.position).multiplyScalar(amount);
                this._translationMatrix.makeTranslation(focusPoint.x, focusPoint.y, focusPoint.z);
                const gizmoStateTemp = this._gizmoMatrixState.clone();
                this._gizmoMatrixState.premultiply(this._translationMatrix);
                this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                const cameraStateTemp = this._cameraMatrixState.clone();
                this._cameraMatrixState.premultiply(this._translationMatrix);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                if (this.enableZoom) {
                    this.applyTransformMatrix(this.applyScale(size, this._gizmos.position));
                }
                this._gizmoMatrixState.copy(gizmoStateTemp);
                this._cameraMatrixState.copy(cameraStateTemp);
            }
        });
        /**
     * Draw a grid and add it to the scene
     */ __publicField(this, "drawGrid", ()=>{
            if (this.scene) {
                const color = 8947848;
                const multiplier = 3;
                let size, divisions, maxLength, tick;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                    const width = this.camera.right - this.camera.left;
                    const height = this.camera.bottom - this.camera.top;
                    maxLength = Math.max(width, height);
                    tick = maxLength / 20;
                    size = maxLength / this.camera.zoom * multiplier;
                    divisions = size / tick * this.camera.zoom;
                } else if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    const distance = this.camera.position.distanceTo(this._gizmos.position);
                    const halfFovV = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].DEG2RAD * this.camera.fov * 0.5;
                    const halfFovH = Math.atan(this.camera.aspect * Math.tan(halfFovV));
                    maxLength = Math.tan(Math.max(halfFovV, halfFovH)) * distance * 2;
                    tick = maxLength / 20;
                    size = maxLength * multiplier;
                    divisions = size / tick;
                }
                if (this._grid == null && this.camera) {
                    this._grid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GridHelper"](size, divisions, color, color);
                    this._grid.position.copy(this._gizmos.position);
                    this._gridPosition.copy(this._grid.position);
                    this._grid.quaternion.copy(this.camera.quaternion);
                    this._grid.rotateX(Math.PI * 0.5);
                    this.scene.add(this._grid);
                }
            }
        });
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.ArcballControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.style.touchAction = "none";
            this.domElement.addEventListener("contextmenu", this.onContextMenu);
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("pointercancel", this.onPointerCancel);
            this.domElement.addEventListener("wheel", this.onWheel);
        });
        /**
     * Remove all listeners, stop animations and clean scene
     */ __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d, _e;
            if (this._animationId != -1) {
                window.cancelAnimationFrame(this._animationId);
            }
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("pointerdown", this.onPointerDown);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("pointercancel", this.onPointerCancel);
            (_c = this.domElement) == null ? void 0 : _c.removeEventListener("wheel", this.onWheel);
            (_d = this.domElement) == null ? void 0 : _d.removeEventListener("contextmenu", this.onContextMenu);
            window.removeEventListener("pointermove", this.onPointerMove);
            window.removeEventListener("pointerup", this.onPointerUp);
            window.removeEventListener("resize", this.onWindowResize);
            (_e = this.scene) == null ? void 0 : _e.remove(this._gizmos);
            this.disposeGrid();
        });
        /**
     * remove the grid from the scene
     */ __publicField(this, "disposeGrid", ()=>{
            if (this._grid && this.scene) {
                this.scene.remove(this._grid);
                this._grid = null;
            }
        });
        /**
     * Compute the easing out cubic function for ease out effect in animation
     * @param {Number} t The absolute progress of the animation in the bound of 0 (beginning of the) and 1 (ending of animation)
     * @returns {Number} Result of easing out cubic at time t
     */ __publicField(this, "easeOutCubic", (t)=>{
            return 1 - Math.pow(1 - t, 3);
        });
        /**
     * Make rotation gizmos more or less visible
     * @param {Boolean} isActive If true, make gizmos more visible
     */ __publicField(this, "activateGizmos", (isActive)=>{
            for (const gizmo of this._gizmos.children){
                gizmo.material.setValues({
                    opacity: isActive ? 1 : 0.6
                });
            }
        });
        /**
     * Calculate the cursor position in NDC
     * @param {number} x Cursor horizontal coordinate within the canvas
     * @param {number} y Cursor vertical coordinate within the canvas
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @returns {Vector2} Cursor normalized position inside the canvas
     */ __publicField(this, "getCursorNDC", (cursorX, cursorY, canvas)=>{
            const canvasRect = canvas.getBoundingClientRect();
            this._v2_1.setX((cursorX - canvasRect.left) / canvasRect.width * 2 - 1);
            this._v2_1.setY((canvasRect.bottom - cursorY) / canvasRect.height * 2 - 1);
            return this._v2_1.clone();
        });
        /**
     * Calculate the cursor position inside the canvas x/y coordinates with the origin being in the center of the canvas
     * @param {Number} x Cursor horizontal coordinate within the canvas
     * @param {Number} y Cursor vertical coordinate within the canvas
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @returns {Vector2} Cursor position inside the canvas
     */ __publicField(this, "getCursorPosition", (cursorX, cursorY, canvas)=>{
            this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.x *= (this.camera.right - this.camera.left) * 0.5;
                this._v2_1.y *= (this.camera.top - this.camera.bottom) * 0.5;
            }
            return this._v2_1.clone();
        });
        /**
     * Set the camera to be controlled
     * @param {Camera} camera The virtual camera to be controlled
     */ __publicField(this, "setCamera", (camera)=>{
            if (camera) {
                camera.lookAt(this.target);
                camera.updateMatrix();
                if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this._fov0 = camera.fov;
                    this._fovState = camera.fov;
                }
                this._cameraMatrixState0.copy(camera.matrix);
                this._cameraMatrixState.copy(this._cameraMatrixState0);
                this._cameraProjectionState.copy(camera.projectionMatrix);
                this._zoom0 = camera.zoom;
                this._zoomState = this._zoom0;
                this._initialNear = camera.near;
                this._nearPos0 = camera.position.distanceTo(this.target) - camera.near;
                this._nearPos = this._initialNear;
                this._initialFar = camera.far;
                this._farPos0 = camera.position.distanceTo(this.target) - camera.far;
                this._farPos = this._initialFar;
                this._up0.copy(camera.up);
                this._upState.copy(camera.up);
                this.camera = camera;
                this.camera.updateProjectionMatrix();
                const tbRadius = this.calculateTbRadius(camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
            }
        });
        /**
     * Creates the rotation gizmos matching trackball center and radius
     * @param {Vector3} tbCenter The trackball center
     * @param {number} tbRadius The trackball radius
     */ __publicField(this, "makeGizmos", (tbCenter, tbRadius)=>{
            const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, tbRadius, tbRadius);
            const points = curve.getPoints(this._curvePts);
            const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
            const curveMaterialX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 16744576,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const curveMaterialY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 8454016,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const curveMaterialZ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 8421631,
                fog: false,
                transparent: true,
                opacity: 0.6
            });
            const gizmoX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialX);
            const gizmoY = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialY);
            const gizmoZ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](curveGeometry, curveMaterialZ);
            const rotation = Math.PI * 0.5;
            gizmoX.rotation.x = rotation;
            gizmoY.rotation.y = rotation;
            this._gizmoMatrixState0.identity().setPosition(tbCenter);
            this._gizmoMatrixState.copy(this._gizmoMatrixState0);
            if (this.camera && this.camera.zoom != 1) {
                const size = 1 / this.camera.zoom;
                this._scaleMatrix.makeScale(size, size, size);
                this._translationMatrix.makeTranslation(-tbCenter.x, -tbCenter.y, -tbCenter.z);
                this._gizmoMatrixState.premultiply(this._translationMatrix).premultiply(this._scaleMatrix);
                this._translationMatrix.makeTranslation(tbCenter.x, tbCenter.y, tbCenter.z);
                this._gizmoMatrixState.premultiply(this._translationMatrix);
            }
            this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
            this._gizmos.clear();
            this._gizmos.add(gizmoX);
            this._gizmos.add(gizmoY);
            this._gizmos.add(gizmoZ);
        });
        /**
     * Perform animation for focus operation
     * @param {Number} time Instant in which this function is called as performance.now()
     * @param {Vector3} point Point of interest for focus operation
     * @param {Matrix4} cameraMatrix Camera matrix
     * @param {Matrix4} gizmoMatrix Gizmos matrix
     */ __publicField(this, "onFocusAnim", (time, point, cameraMatrix, gizmoMatrix)=>{
            if (this._timeStart == -1) {
                this._timeStart = time;
            }
            if (this._state == STATE.ANIMATION_FOCUS) {
                const deltaTime = time - this._timeStart;
                const animTime = deltaTime / this.focusAnimationTime;
                this._gizmoMatrixState.copy(gizmoMatrix);
                if (animTime >= 1) {
                    this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                    this.focus(point, this.scaleFactor);
                    this._timeStart = -1;
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                } else {
                    const amount = this.easeOutCubic(animTime);
                    const size = 1 - amount + this.scaleFactor * amount;
                    this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                    this.focus(point, size, amount);
                    this.dispatchEvent(_changeEvent);
                    const self = this;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.onFocusAnim(t, point, cameraMatrix, gizmoMatrix.clone());
                    });
                }
            } else {
                this._animationId = -1;
                this._timeStart = -1;
            }
        });
        /**
     * Perform animation for rotation operation
     * @param {Number} time Instant in which this function is called as performance.now()
     * @param {Vector3} rotationAxis Rotation axis
     * @param {number} w0 Initial angular velocity
     */ __publicField(this, "onRotationAnim", (time, rotationAxis, w0)=>{
            if (this._timeStart == -1) {
                this._anglePrev = 0;
                this._angleCurrent = 0;
                this._timeStart = time;
            }
            if (this._state == STATE.ANIMATION_ROTATE) {
                const deltaTime = (time - this._timeStart) / 1e3;
                const w = w0 + -this.dampingFactor * deltaTime;
                if (w > 0) {
                    this._angleCurrent = 0.5 * -this.dampingFactor * Math.pow(deltaTime, 2) + w0 * deltaTime + 0;
                    this.applyTransformMatrix(this.rotate(rotationAxis, this._angleCurrent));
                    this.dispatchEvent(_changeEvent);
                    const self = this;
                    this._animationId = window.requestAnimationFrame(function(t) {
                        self.onRotationAnim(t, rotationAxis, w0);
                    });
                } else {
                    this._animationId = -1;
                    this._timeStart = -1;
                    this.updateTbState(STATE.IDLE, false);
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            } else {
                this._animationId = -1;
                this._timeStart = -1;
                if (this._state != STATE.ROTATE) {
                    this.activateGizmos(false);
                    this.dispatchEvent(_changeEvent);
                }
            }
        });
        /**
     * Perform pan operation moving camera between two points
     * @param {Vector3} p0 Initial point
     * @param {Vector3} p1 Ending point
     * @param {Boolean} adjust If movement should be adjusted considering camera distance (Perspective only)
     */ __publicField(this, "pan", (p0, p1, adjust = false)=>{
            if (this.camera) {
                const movement = p0.clone().sub(p1);
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                    movement.multiplyScalar(1 / this.camera.zoom);
                }
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"] && adjust) {
                    this._v3_1.setFromMatrixPosition(this._cameraMatrixState0);
                    this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0);
                    const distanceFactor = this._v3_1.distanceTo(this._v3_2) / this.camera.position.distanceTo(this._gizmos.position);
                    movement.multiplyScalar(1 / distanceFactor);
                }
                this._v3_1.set(movement.x, movement.y, 0).applyQuaternion(this.camera.quaternion);
                this._m4_1.makeTranslation(this._v3_1.x, this._v3_1.y, this._v3_1.z);
                this.setTransformationMatrices(this._m4_1, this._m4_1);
            }
            return _transformation;
        });
        /**
     * Reset trackball
     */ __publicField(this, "reset", ()=>{
            if (this.camera) {
                this.camera.zoom = this._zoom0;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this.camera.fov = this._fov0;
                }
                this.camera.near = this._nearPos;
                this.camera.far = this._farPos;
                this._cameraMatrixState.copy(this._cameraMatrixState0);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                this.camera.up.copy(this._up0);
                this.camera.updateMatrix();
                this.camera.updateProjectionMatrix();
                this._gizmoMatrixState.copy(this._gizmoMatrixState0);
                this._gizmoMatrixState0.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                this._gizmos.updateMatrix();
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this._gizmos.position, this._tbRadius);
                this.camera.lookAt(this._gizmos.position);
                this.updateTbState(STATE.IDLE, false);
                this.dispatchEvent(_changeEvent);
            }
        });
        /**
     * Rotate the camera around an axis passing by trackball's center
     * @param {Vector3} axis Rotation axis
     * @param {number} angle Angle in radians
     * @returns {Object} Object with 'camera' field containing transformation matrix resulting from the operation to be applied to the camera
     */ __publicField(this, "rotate", (axis, angle)=>{
            const point = this._gizmos.position;
            this._translationMatrix.makeTranslation(-point.x, -point.y, -point.z);
            this._rotationMatrix.makeRotationAxis(axis, -angle);
            this._m4_1.makeTranslation(point.x, point.y, point.z);
            this._m4_1.multiply(this._rotationMatrix);
            this._m4_1.multiply(this._translationMatrix);
            this.setTransformationMatrices(this._m4_1);
            return _transformation;
        });
        __publicField(this, "copyState", ()=>{
            if (this.camera) {
                const state = JSON.stringify(this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"] ? {
                    arcballState: {
                        cameraFar: this.camera.far,
                        cameraMatrix: this.camera.matrix,
                        cameraNear: this.camera.near,
                        cameraUp: this.camera.up,
                        cameraZoom: this.camera.zoom,
                        gizmoMatrix: this._gizmos.matrix
                    }
                } : {
                    arcballState: {
                        cameraFar: this.camera.far,
                        cameraFov: this.camera.fov,
                        cameraMatrix: this.camera.matrix,
                        cameraNear: this.camera.near,
                        cameraUp: this.camera.up,
                        cameraZoom: this.camera.zoom,
                        gizmoMatrix: this._gizmos.matrix
                    }
                });
                navigator.clipboard.writeText(state);
            }
        });
        __publicField(this, "pasteState", ()=>{
            const self = this;
            navigator.clipboard.readText().then(function resolved(value) {
                self.setStateFromJSON(value);
            });
        });
        /**
     * Save the current state of the control. This can later be recovered with .reset
     */ __publicField(this, "saveState", ()=>{
            if (!this.camera) return;
            this._cameraMatrixState0.copy(this.camera.matrix);
            this._gizmoMatrixState0.copy(this._gizmos.matrix);
            this._nearPos = this.camera.near;
            this._farPos = this.camera.far;
            this._zoom0 = this.camera.zoom;
            this._up0.copy(this.camera.up);
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._fov0 = this.camera.fov;
            }
        });
        /**
     * Perform uniform scale operation around a given point
     * @param {Number} size Scale factor
     * @param {Vector3} point Point around which scale
     * @param {Boolean} scaleGizmos If gizmos should be scaled (Perspective only)
     * @returns {Object} Object with 'camera' and 'gizmo' fields containing transformation matrices resulting from the operation to be applied to the camera and gizmos
     */ __publicField(this, "applyScale", (size, point, scaleGizmos = true)=>{
            if (!this.camera) return;
            const scalePoint = point.clone();
            let sizeInverse = 1 / size;
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this.camera.zoom = this._zoomState;
                this.camera.zoom *= size;
                if (this.camera.zoom > this.maxZoom) {
                    this.camera.zoom = this.maxZoom;
                    sizeInverse = this._zoomState / this.maxZoom;
                } else if (this.camera.zoom < this.minZoom) {
                    this.camera.zoom = this.minZoom;
                    sizeInverse = this._zoomState / this.minZoom;
                }
                this.camera.updateProjectionMatrix();
                this._v3_1.setFromMatrixPosition(this._gizmoMatrixState);
                this._scaleMatrix.makeScale(sizeInverse, sizeInverse, sizeInverse);
                this._translationMatrix.makeTranslation(-this._v3_1.x, -this._v3_1.y, -this._v3_1.z);
                this._m4_2.makeTranslation(this._v3_1.x, this._v3_1.y, this._v3_1.z).multiply(this._scaleMatrix);
                this._m4_2.multiply(this._translationMatrix);
                scalePoint.sub(this._v3_1);
                const amount = scalePoint.clone().multiplyScalar(sizeInverse);
                scalePoint.sub(amount);
                this._m4_1.makeTranslation(scalePoint.x, scalePoint.y, scalePoint.z);
                this._m4_2.premultiply(this._m4_1);
                this.setTransformationMatrices(this._m4_1, this._m4_2);
                return _transformation;
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v3_1.setFromMatrixPosition(this._cameraMatrixState);
                this._v3_2.setFromMatrixPosition(this._gizmoMatrixState);
                let distance = this._v3_1.distanceTo(scalePoint);
                let amount = distance - distance * sizeInverse;
                const newDistance = distance - amount;
                if (newDistance < this.minDistance) {
                    sizeInverse = this.minDistance / distance;
                    amount = distance - distance * sizeInverse;
                } else if (newDistance > this.maxDistance) {
                    sizeInverse = this.maxDistance / distance;
                    amount = distance - distance * sizeInverse;
                }
                let direction = scalePoint.clone().sub(this._v3_1).normalize().multiplyScalar(amount);
                this._m4_1.makeTranslation(direction.x, direction.y, direction.z);
                if (scaleGizmos) {
                    const pos = this._v3_2;
                    distance = pos.distanceTo(scalePoint);
                    amount = distance - distance * sizeInverse;
                    direction = scalePoint.clone().sub(this._v3_2).normalize().multiplyScalar(amount);
                    this._translationMatrix.makeTranslation(pos.x, pos.y, pos.z);
                    this._scaleMatrix.makeScale(sizeInverse, sizeInverse, sizeInverse);
                    this._m4_2.makeTranslation(direction.x, direction.y, direction.z).multiply(this._translationMatrix);
                    this._m4_2.multiply(this._scaleMatrix);
                    this._translationMatrix.makeTranslation(-pos.x, -pos.y, -pos.z);
                    this._m4_2.multiply(this._translationMatrix);
                    this.setTransformationMatrices(this._m4_1, this._m4_2);
                } else {
                    this.setTransformationMatrices(this._m4_1);
                }
                return _transformation;
            }
        });
        /**
     * Set camera fov
     * @param {Number} value fov to be setted
     */ __publicField(this, "setFov", (value)=>{
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this.camera.fov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(value, this.minFov, this.maxFov);
                this.camera.updateProjectionMatrix();
            }
        });
        /**
     * Set the trackball's center point
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Number} z Z coordinate
     */ __publicField(this, "setTarget", (x, y, z)=>{
            if (this.camera) {
                this.target.set(x, y, z);
                this._gizmos.position.set(x, y, z);
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
                this.camera.lookAt(this.target);
            }
        });
        /**
     * Rotate camera around its direction axis passing by a given point by a given angle
     * @param {Vector3} point The point where the rotation axis is passing trough
     * @param {Number} angle Angle in radians
     * @returns The computed transormation matix
     */ __publicField(this, "zRotate", (point, angle)=>{
            this._rotationMatrix.makeRotationAxis(this._rotationAxis, angle);
            this._translationMatrix.makeTranslation(-point.x, -point.y, -point.z);
            this._m4_1.makeTranslation(point.x, point.y, point.z);
            this._m4_1.multiply(this._rotationMatrix);
            this._m4_1.multiply(this._translationMatrix);
            this._v3_1.setFromMatrixPosition(this._gizmoMatrixState).sub(point);
            this._v3_2.copy(this._v3_1).applyAxisAngle(this._rotationAxis, angle);
            this._v3_2.sub(this._v3_1);
            this._m4_2.makeTranslation(this._v3_2.x, this._v3_2.y, this._v3_2.z);
            this.setTransformationMatrices(this._m4_1, this._m4_2);
            return _transformation;
        });
        /**
     * Unproject the cursor on the 3D object surface
     * @param {Vector2} cursor Cursor coordinates in NDC
     * @param {Camera} camera Virtual camera
     * @returns {Vector3} The point of intersection with the model, if exist, null otherwise
     */ __publicField(this, "unprojectOnObj", (cursor, camera)=>{
            if (!this.scene) return null;
            const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]();
            raycaster.near = camera.near;
            raycaster.far = camera.far;
            raycaster.setFromCamera(cursor, camera);
            const intersect = raycaster.intersectObjects(this.scene.children, true);
            for(let i = 0; i < intersect.length; i++){
                if (intersect[i].object.uuid != this._gizmos.uuid && intersect[i].face) {
                    return intersect[i].point.clone();
                }
            }
            return null;
        });
        /**
     * Unproject the cursor on the trackball surface
     * @param {Camera} camera The virtual camera
     * @param {Number} cursorX Cursor horizontal coordinate on screen
     * @param {Number} cursorY Cursor vertical coordinate on screen
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @param {number} tbRadius The trackball radius
     * @returns {Vector3} The unprojected point on the trackball surface
     */ __publicField(this, "unprojectOnTbSurface", (camera, cursorX, cursorY, canvas, tbRadius)=>{
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.copy(this.getCursorPosition(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, 0);
                const x2 = Math.pow(this._v2_1.x, 2);
                const y2 = Math.pow(this._v2_1.y, 2);
                const r2 = Math.pow(this._tbRadius, 2);
                if (x2 + y2 <= r2 * 0.5) {
                    this._v3_1.setZ(Math.sqrt(r2 - (x2 + y2)));
                } else {
                    this._v3_1.setZ(r2 * 0.5 / Math.sqrt(x2 + y2));
                }
                return this._v3_1;
            }
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, -1);
                this._v3_1.applyMatrix4(camera.projectionMatrixInverse);
                const rayDir = this._v3_1.clone().normalize();
                const cameraGizmoDistance = camera.position.distanceTo(this._gizmos.position);
                const radius2 = Math.pow(tbRadius, 2);
                const h = this._v3_1.z;
                const l = Math.sqrt(Math.pow(this._v3_1.x, 2) + Math.pow(this._v3_1.y, 2));
                if (l == 0) {
                    rayDir.set(this._v3_1.x, this._v3_1.y, tbRadius);
                    return rayDir;
                }
                const m = h / l;
                const q = cameraGizmoDistance;
                let a = Math.pow(m, 2) + 1;
                let b = 2 * m * q;
                let c = Math.pow(q, 2) - radius2;
                let delta = Math.pow(b, 2) - 4 * a * c;
                if (delta >= 0) {
                    this._v2_1.setX((-b - Math.sqrt(delta)) / (2 * a));
                    this._v2_1.setY(m * this._v2_1.x + q);
                    const angle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].RAD2DEG * this._v2_1.angle();
                    if (angle >= 45) {
                        const rayLength2 = Math.sqrt(Math.pow(this._v2_1.x, 2) + Math.pow(cameraGizmoDistance - this._v2_1.y, 2));
                        rayDir.multiplyScalar(rayLength2);
                        rayDir.z += cameraGizmoDistance;
                        return rayDir;
                    }
                }
                a = m;
                b = q;
                c = -radius2 * 0.5;
                delta = Math.pow(b, 2) - 4 * a * c;
                this._v2_1.setX((-b - Math.sqrt(delta)) / (2 * a));
                this._v2_1.setY(m * this._v2_1.x + q);
                const rayLength = Math.sqrt(Math.pow(this._v2_1.x, 2) + Math.pow(cameraGizmoDistance - this._v2_1.y, 2));
                rayDir.multiplyScalar(rayLength);
                rayDir.z += cameraGizmoDistance;
                return rayDir;
            }
        });
        /**
     * Unproject the cursor on the plane passing through the center of the trackball orthogonal to the camera
     * @param {Camera} camera The virtual camera
     * @param {Number} cursorX Cursor horizontal coordinate on screen
     * @param {Number} cursorY Cursor vertical coordinate on screen
     * @param {HTMLElement} canvas The canvas where the renderer draws its output
     * @param {Boolean} initialDistance If initial distance between camera and gizmos should be used for calculations instead of current (Perspective only)
     * @returns {Vector3} The unprojected point on the trackball plane
     */ __publicField(this, "unprojectOnTbPlane", (camera, cursorX, cursorY, canvas, initialDistance = false)=>{
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._v2_1.copy(this.getCursorPosition(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, 0);
                return this._v3_1.clone();
            }
            if (camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._v2_1.copy(this.getCursorNDC(cursorX, cursorY, canvas));
                this._v3_1.set(this._v2_1.x, this._v2_1.y, -1);
                this._v3_1.applyMatrix4(camera.projectionMatrixInverse);
                const rayDir = this._v3_1.clone().normalize();
                const h = this._v3_1.z;
                const l = Math.sqrt(Math.pow(this._v3_1.x, 2) + Math.pow(this._v3_1.y, 2));
                let cameraGizmoDistance;
                if (initialDistance) {
                    cameraGizmoDistance = this._v3_1.setFromMatrixPosition(this._cameraMatrixState0).distanceTo(this._v3_2.setFromMatrixPosition(this._gizmoMatrixState0));
                } else {
                    cameraGizmoDistance = camera.position.distanceTo(this._gizmos.position);
                }
                if (l == 0) {
                    rayDir.set(0, 0, 0);
                    return rayDir;
                }
                const m = h / l;
                const q = cameraGizmoDistance;
                const x = -q / m;
                const rayLength = Math.sqrt(Math.pow(q, 2) + Math.pow(x, 2));
                rayDir.multiplyScalar(rayLength);
                rayDir.z = 0;
                return rayDir;
            }
        });
        /**
     * Update camera and gizmos state
     */ __publicField(this, "updateMatrixState", ()=>{
            if (!this.camera) return;
            this._cameraMatrixState.copy(this.camera.matrix);
            this._gizmoMatrixState.copy(this._gizmos.matrix);
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                this._cameraProjectionState.copy(this.camera.projectionMatrix);
                this.camera.updateProjectionMatrix();
                this._zoomState = this.camera.zoom;
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                this._fovState = this.camera.fov;
            }
        });
        /**
     * Update the trackball FSA
     * @param {STATE} newState New state of the FSA
     * @param {Boolean} updateMatrices If matriices state should be updated
     */ __publicField(this, "updateTbState", (newState, updateMatrices)=>{
            this._state = newState;
            if (updateMatrices) {
                this.updateMatrixState();
            }
        });
        __publicField(this, "update", ()=>{
            const EPS = 1e-6;
            if (!this.target.equals(this._currentTarget) && this.camera) {
                this._gizmos.position.set(this.target.x, this.target.y, this.target.z);
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                this.makeGizmos(this.target, this._tbRadius);
                this._currentTarget.copy(this.target);
            }
            if (!this.camera) return;
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"]) {
                if (this.camera.zoom > this.maxZoom || this.camera.zoom < this.minZoom) {
                    const newZoom = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.camera.zoom, this.minZoom, this.maxZoom);
                    this.applyTransformMatrix(this.applyScale(newZoom / this.camera.zoom, this._gizmos.position, true));
                }
            }
            if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                const distance = this.camera.position.distanceTo(this._gizmos.position);
                if (distance > this.maxDistance + EPS || distance < this.minDistance - EPS) {
                    const newDistance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(distance, this.minDistance, this.maxDistance);
                    this.applyTransformMatrix(this.applyScale(newDistance / distance, this._gizmos.position));
                    this.updateMatrixState();
                }
                if (this.camera.fov < this.minFov || this.camera.fov > this.maxFov) {
                    this.camera.fov = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.camera.fov, this.minFov, this.maxFov);
                    this.camera.updateProjectionMatrix();
                }
                const oldRadius = this._tbRadius;
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                if (oldRadius < this._tbRadius - EPS || oldRadius > this._tbRadius + EPS) {
                    const scale = (this._gizmos.scale.x + this._gizmos.scale.y + this._gizmos.scale.z) / 3;
                    const newRadius = this._tbRadius / scale;
                    const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EllipseCurve"](0, 0, newRadius, newRadius);
                    const points = curve.getPoints(this._curvePts);
                    const curveGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
                    for(const gizmo in this._gizmos.children){
                        const child = this._gizmos.children[gizmo];
                        child.geometry = curveGeometry;
                    }
                }
            }
            this.camera.lookAt(this._gizmos.position);
        });
        __publicField(this, "setStateFromJSON", (json)=>{
            const state = JSON.parse(json);
            if (state.arcballState && this.camera) {
                this._cameraMatrixState.fromArray(state.arcballState.cameraMatrix.elements);
                this._cameraMatrixState.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
                this.camera.up.copy(state.arcballState.cameraUp);
                this.camera.near = state.arcballState.cameraNear;
                this.camera.far = state.arcballState.cameraFar;
                this.camera.zoom = state.arcballState.cameraZoom;
                if (this.camera instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"]) {
                    this.camera.fov = state.arcballState.cameraFov;
                }
                this._gizmoMatrixState.fromArray(state.arcballState.gizmoMatrix.elements);
                this._gizmoMatrixState.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
                this.camera.updateMatrix();
                this.camera.updateProjectionMatrix();
                this._gizmos.updateMatrix();
                const tbRadius = this.calculateTbRadius(this.camera);
                if (tbRadius !== void 0) {
                    this._tbRadius = tbRadius;
                }
                const gizmoTmp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(this._gizmoMatrixState0);
                this.makeGizmos(this._gizmos.position, this._tbRadius);
                this._gizmoMatrixState0.copy(gizmoTmp);
                this.camera.lookAt(this._gizmos.position);
                this.updateTbState(STATE.IDLE, false);
                this.dispatchEvent(_changeEvent);
            }
        });
        this.camera = null;
        this.domElement = domElement;
        this.scene = scene;
        this.mouseActions = [];
        this._mouseOp = null;
        this._v2_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]();
        this._v3_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._v3_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._m4_1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._m4_2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._quat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
        this._translationMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._rotationMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._scaleMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._rotationAxis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._cameraMatrixState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._cameraProjectionState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._fovState = 1;
        this._upState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._zoomState = 1;
        this._nearPos = 0;
        this._farPos = 0;
        this._gizmoMatrixState = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._up0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._zoom0 = 1;
        this._fov0 = 0;
        this._initialNear = 0;
        this._nearPos0 = 0;
        this._initialFar = 0;
        this._farPos0 = 0;
        this._cameraMatrixState0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._gizmoMatrixState0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
        this._button = -1;
        this._touchStart = [];
        this._touchCurrent = [];
        this._input = INPUT.NONE;
        this._switchSensibility = 32;
        this._startFingerDistance = 0;
        this._currentFingerDistance = 0;
        this._startFingerRotation = 0;
        this._currentFingerRotation = 0;
        this._devPxRatio = 0;
        this._downValid = true;
        this._nclicks = 0;
        this._downEvents = [];
        this._clickStart = 0;
        this._maxDownTime = 250;
        this._maxInterval = 300;
        this._posThreshold = 24;
        this._movementThreshold = 24;
        this._currentCursorPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._startCursorPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._grid = null;
        this._gridPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._gizmos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        this._curvePts = 128;
        this._timeStart = -1;
        this._animationId = -1;
        this.focusAnimationTime = 500;
        this._timePrev = 0;
        this._timeCurrent = 0;
        this._anglePrev = 0;
        this._angleCurrent = 0;
        this._cursorPosPrev = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._cursorPosCurr = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        this._wPrev = 0;
        this._wCurr = 0;
        this.adjustNearFar = false;
        this.scaleFactor = 1.1;
        this.dampingFactor = 25;
        this.wMax = 20;
        this.enableAnimations = true;
        this.enableGrid = false;
        this.cursorZoom = false;
        this.minFov = 5;
        this.maxFov = 90;
        this.enabled = true;
        this.enablePan = true;
        this.enableRotate = true;
        this.enableZoom = true;
        this.minDistance = 0;
        this.maxDistance = Infinity;
        this.minZoom = 0;
        this.maxZoom = Infinity;
        this.target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
        this._currentTarget = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0);
        this._tbRadius = 1;
        this._state = STATE.IDLE;
        this.setCamera(camera);
        if (this.scene) {
            this.scene.add(this._gizmos);
        }
        this._devPxRatio = window.devicePixelRatio;
        this.initializeMouseActions();
        if (this.domElement) this.connect(this.domElement);
        window.addEventListener("resize", this.onWindowResize);
    }
    /**
   * Apply a transformation matrix, to the camera and gizmos
   * @param {Object} transformation Object containing matrices to apply to camera and gizmos
   */ applyTransformMatrix(transformation) {
        if ((transformation == null ? void 0 : transformation.camera) && this.camera) {
            this._m4_1.copy(this._cameraMatrixState).premultiply(transformation.camera);
            this._m4_1.decompose(this.camera.position, this.camera.quaternion, this.camera.scale);
            this.camera.updateMatrix();
            if (this._state == STATE.ROTATE || this._state == STATE.ZROTATE || this._state == STATE.ANIMATION_ROTATE) {
                this.camera.up.copy(this._upState).applyQuaternion(this.camera.quaternion);
            }
        }
        if (transformation == null ? void 0 : transformation.gizmos) {
            this._m4_1.copy(this._gizmoMatrixState).premultiply(transformation.gizmos);
            this._m4_1.decompose(this._gizmos.position, this._gizmos.quaternion, this._gizmos.scale);
            this._gizmos.updateMatrix();
        }
        if ((this._state == STATE.SCALE || this._state == STATE.FOCUS || this._state == STATE.ANIMATION_FOCUS) && this.camera) {
            const tbRadius = this.calculateTbRadius(this.camera);
            if (tbRadius !== void 0) {
                this._tbRadius = tbRadius;
            }
            if (this.adjustNearFar) {
                const cameraDistance = this.camera.position.distanceTo(this._gizmos.position);
                const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
                bb.setFromObject(this._gizmos);
                const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"]();
                bb.getBoundingSphere(sphere);
                const adjustedNearPosition = Math.max(this._nearPos0, sphere.radius + sphere.center.length());
                const regularNearPosition = cameraDistance - this._initialNear;
                const minNearPos = Math.min(adjustedNearPosition, regularNearPosition);
                this.camera.near = cameraDistance - minNearPos;
                const adjustedFarPosition = Math.min(this._farPos0, -sphere.radius + sphere.center.length());
                const regularFarPosition = cameraDistance - this._initialFar;
                const minFarPos = Math.min(adjustedFarPosition, regularFarPosition);
                this.camera.far = cameraDistance - minFarPos;
                this.camera.updateProjectionMatrix();
            } else {
                let update = false;
                if (this.camera.near != this._initialNear) {
                    this.camera.near = this._initialNear;
                    update = true;
                }
                if (this.camera.far != this._initialFar) {
                    this.camera.far = this._initialFar;
                    update = true;
                }
                if (update) {
                    this.camera.updateProjectionMatrix();
                }
            }
        }
    }
    /**
   * Set gizmos visibility
   * @param {Boolean} value Value of gizmos visibility
   */ setGizmosVisible(value) {
        this._gizmos.visible = value;
        this.dispatchEvent(_changeEvent);
    }
    /**
   * Set values in transformation object
   * @param {Matrix4} camera Transformation to be applied to the camera
   * @param {Matrix4} gizmos Transformation to be applied to gizmos
   */ setTransformationMatrices(camera = null, gizmos = null) {
        if (camera) {
            if (_transformation.camera) {
                _transformation.camera.copy(camera);
            } else {
                _transformation.camera = camera.clone();
            }
        } else {
            _transformation.camera = null;
        }
        if (gizmos) {
            if (_transformation.gizmos) {
                _transformation.gizmos.copy(gizmos);
            } else {
                _transformation.gizmos = gizmos.clone();
            }
        } else {
            _transformation.gizmos = null;
        }
    }
}
;
 //# sourceMappingURL=ArcballControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/TransformControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransformControls",
    ()=>TransformControls,
    "TransformControlsGizmo",
    ()=>TransformControlsGizmo,
    "TransformControlsPlane",
    ()=>TransformControlsPlane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
class TransformControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"] {
    constructor(camera, domElement){
        super();
        __publicField(this, "isTransformControls", true);
        __publicField(this, "visible", false);
        __publicField(this, "domElement");
        __publicField(this, "raycaster", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Raycaster"]());
        __publicField(this, "gizmo");
        __publicField(this, "plane");
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempVector2", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "unit", {
            X: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0),
            Y: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0),
            Z: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1)
        });
        __publicField(this, "pointStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "pointEnd", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "offset", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "rotationAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "startNorm", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "endNorm", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "rotationAngle", 0);
        __publicField(this, "cameraPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cameraQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "cameraScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "parentPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "parentQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "parentQuaternionInv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "parentScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPositionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldScaleStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldQuaternionInv", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldScale", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "positionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "quaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "scaleStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "camera");
        __publicField(this, "object");
        __publicField(this, "enabled", true);
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "translationSnap", null);
        __publicField(this, "rotationSnap", null);
        __publicField(this, "scaleSnap", null);
        __publicField(this, "space", "world");
        __publicField(this, "size", 1);
        __publicField(this, "dragging", false);
        __publicField(this, "showX", true);
        __publicField(this, "showY", true);
        __publicField(this, "showZ", true);
        // events
        __publicField(this, "changeEvent", {
            type: "change"
        });
        __publicField(this, "mouseDownEvent", {
            type: "mouseDown",
            mode: this.mode
        });
        __publicField(this, "mouseUpEvent", {
            type: "mouseUp",
            mode: this.mode
        });
        __publicField(this, "objectChangeEvent", {
            type: "objectChange"
        });
        __publicField(this, "intersectObjectWithRay", (object, raycaster, includeInvisible)=>{
            const allIntersections = raycaster.intersectObject(object, true);
            for(let i = 0; i < allIntersections.length; i++){
                if (allIntersections[i].object.visible || includeInvisible) {
                    return allIntersections[i];
                }
            }
            return false;
        });
        // Set current object
        __publicField(this, "attach", (object)=>{
            this.object = object;
            this.visible = true;
            return this;
        });
        // Detatch from object
        __publicField(this, "detach", ()=>{
            this.object = void 0;
            this.visible = false;
            this.axis = null;
            return this;
        });
        // Reset
        __publicField(this, "reset", ()=>{
            if (!this.enabled) return this;
            if (this.dragging) {
                if (this.object !== void 0) {
                    this.object.position.copy(this.positionStart);
                    this.object.quaternion.copy(this.quaternionStart);
                    this.object.scale.copy(this.scaleStart);
                    this.dispatchEvent(this.changeEvent);
                    this.dispatchEvent(this.objectChangeEvent);
                    this.pointStart.copy(this.pointEnd);
                }
            }
            return this;
        });
        __publicField(this, "updateMatrixWorld", ()=>{
            if (this.object !== void 0) {
                this.object.updateMatrixWorld();
                if (this.object.parent === null) {
                    console.error("TransformControls: The attached 3D object must be a part of the scene graph.");
                } else {
                    this.object.parent.matrixWorld.decompose(this.parentPosition, this.parentQuaternion, this.parentScale);
                }
                this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this.worldScale);
                this.parentQuaternionInv.copy(this.parentQuaternion).invert();
                this.worldQuaternionInv.copy(this.worldQuaternion).invert();
            }
            this.camera.updateMatrixWorld();
            this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this.cameraScale);
            this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
            super.updateMatrixWorld();
        });
        __publicField(this, "pointerHover", (pointer)=>{
            if (this.object === void 0 || this.dragging === true) return;
            this.raycaster.setFromCamera(pointer, this.camera);
            const intersect = this.intersectObjectWithRay(this.gizmo.picker[this.mode], this.raycaster);
            if (intersect) {
                this.axis = intersect.object.name;
            } else {
                this.axis = null;
            }
        });
        __publicField(this, "pointerDown", (pointer)=>{
            if (this.object === void 0 || this.dragging === true || pointer.button !== 0) return;
            if (this.axis !== null) {
                this.raycaster.setFromCamera(pointer, this.camera);
                const planeIntersect = this.intersectObjectWithRay(this.plane, this.raycaster, true);
                if (planeIntersect) {
                    let space = this.space;
                    if (this.mode === "scale") {
                        space = "local";
                    } else if (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") {
                        space = "world";
                    }
                    if (space === "local" && this.mode === "rotate") {
                        const snap = this.rotationSnap;
                        if (this.axis === "X" && snap) this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
                        if (this.axis === "Y" && snap) this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
                        if (this.axis === "Z" && snap) this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
                    }
                    this.object.updateMatrixWorld();
                    if (this.object.parent) {
                        this.object.parent.updateMatrixWorld();
                    }
                    this.positionStart.copy(this.object.position);
                    this.quaternionStart.copy(this.object.quaternion);
                    this.scaleStart.copy(this.object.scale);
                    this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this.worldScaleStart);
                    this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
                }
                this.dragging = true;
                this.mouseDownEvent.mode = this.mode;
                this.dispatchEvent(this.mouseDownEvent);
            }
        });
        __publicField(this, "pointerMove", (pointer)=>{
            const axis = this.axis;
            const mode = this.mode;
            const object = this.object;
            let space = this.space;
            if (mode === "scale") {
                space = "local";
            } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
                space = "world";
            }
            if (object === void 0 || axis === null || this.dragging === false || pointer.button !== -1) return;
            this.raycaster.setFromCamera(pointer, this.camera);
            const planeIntersect = this.intersectObjectWithRay(this.plane, this.raycaster, true);
            if (!planeIntersect) return;
            this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);
            if (mode === "translate") {
                this.offset.copy(this.pointEnd).sub(this.pointStart);
                if (space === "local" && axis !== "XYZ") {
                    this.offset.applyQuaternion(this.worldQuaternionInv);
                }
                if (axis.indexOf("X") === -1) this.offset.x = 0;
                if (axis.indexOf("Y") === -1) this.offset.y = 0;
                if (axis.indexOf("Z") === -1) this.offset.z = 0;
                if (space === "local" && axis !== "XYZ") {
                    this.offset.applyQuaternion(this.quaternionStart).divide(this.parentScale);
                } else {
                    this.offset.applyQuaternion(this.parentQuaternionInv).divide(this.parentScale);
                }
                object.position.copy(this.offset).add(this.positionStart);
                if (this.translationSnap) {
                    if (space === "local") {
                        object.position.applyQuaternion(this.tempQuaternion.copy(this.quaternionStart).invert());
                        if (axis.search("X") !== -1) {
                            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Y") !== -1) {
                            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Z") !== -1) {
                            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                        }
                        object.position.applyQuaternion(this.quaternionStart);
                    }
                    if (space === "world") {
                        if (object.parent) {
                            object.position.add(this.tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                        }
                        if (axis.search("X") !== -1) {
                            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Y") !== -1) {
                            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
                        }
                        if (axis.search("Z") !== -1) {
                            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
                        }
                        if (object.parent) {
                            object.position.sub(this.tempVector.setFromMatrixPosition(object.parent.matrixWorld));
                        }
                    }
                }
            } else if (mode === "scale") {
                if (axis.search("XYZ") !== -1) {
                    let d = this.pointEnd.length() / this.pointStart.length();
                    if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;
                    this.tempVector2.set(d, d, d);
                } else {
                    this.tempVector.copy(this.pointStart);
                    this.tempVector2.copy(this.pointEnd);
                    this.tempVector.applyQuaternion(this.worldQuaternionInv);
                    this.tempVector2.applyQuaternion(this.worldQuaternionInv);
                    this.tempVector2.divide(this.tempVector);
                    if (axis.search("X") === -1) {
                        this.tempVector2.x = 1;
                    }
                    if (axis.search("Y") === -1) {
                        this.tempVector2.y = 1;
                    }
                    if (axis.search("Z") === -1) {
                        this.tempVector2.z = 1;
                    }
                }
                object.scale.copy(this.scaleStart).multiply(this.tempVector2);
                if (this.scaleSnap && this.object) {
                    if (axis.search("X") !== -1) {
                        this.object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                    if (axis.search("Y") !== -1) {
                        object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                    if (axis.search("Z") !== -1) {
                        object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
                    }
                }
            } else if (mode === "rotate") {
                this.offset.copy(this.pointEnd).sub(this.pointStart);
                const ROTATION_SPEED = 20 / this.worldPosition.distanceTo(this.tempVector.setFromMatrixPosition(this.camera.matrixWorld));
                if (axis === "E") {
                    this.rotationAxis.copy(this.eye);
                    this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
                    this.startNorm.copy(this.pointStart).normalize();
                    this.endNorm.copy(this.pointEnd).normalize();
                    this.rotationAngle *= this.endNorm.cross(this.startNorm).dot(this.eye) < 0 ? 1 : -1;
                } else if (axis === "XYZE") {
                    this.rotationAxis.copy(this.offset).cross(this.eye).normalize();
                    this.rotationAngle = this.offset.dot(this.tempVector.copy(this.rotationAxis).cross(this.eye)) * ROTATION_SPEED;
                } else if (axis === "X" || axis === "Y" || axis === "Z") {
                    this.rotationAxis.copy(this.unit[axis]);
                    this.tempVector.copy(this.unit[axis]);
                    if (space === "local") {
                        this.tempVector.applyQuaternion(this.worldQuaternion);
                    }
                    this.rotationAngle = this.offset.dot(this.tempVector.cross(this.eye).normalize()) * ROTATION_SPEED;
                }
                if (this.rotationSnap) {
                    this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;
                }
                if (space === "local" && axis !== "E" && axis !== "XYZE") {
                    object.quaternion.copy(this.quaternionStart);
                    object.quaternion.multiply(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize();
                } else {
                    this.rotationAxis.applyQuaternion(this.parentQuaternionInv);
                    object.quaternion.copy(this.tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle));
                    object.quaternion.multiply(this.quaternionStart).normalize();
                }
            }
            this.dispatchEvent(this.changeEvent);
            this.dispatchEvent(this.objectChangeEvent);
        });
        __publicField(this, "pointerUp", (pointer)=>{
            if (pointer.button !== 0) return;
            if (this.dragging && this.axis !== null) {
                this.mouseUpEvent.mode = this.mode;
                this.dispatchEvent(this.mouseUpEvent);
            }
            this.dragging = false;
            this.axis = null;
        });
        __publicField(this, "getPointer", (event)=>{
            var _a;
            if (this.domElement && ((_a = this.domElement.ownerDocument) == null ? void 0 : _a.pointerLockElement)) {
                return {
                    x: 0,
                    y: 0,
                    button: event.button
                };
            } else {
                const pointer = event.changedTouches ? event.changedTouches[0] : event;
                const rect = this.domElement.getBoundingClientRect();
                return {
                    x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
                    y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
                    button: event.button
                };
            }
        });
        __publicField(this, "onPointerHover", (event)=>{
            if (!this.enabled) return;
            switch(event.pointerType){
                case "mouse":
                case "pen":
                    this.pointerHover(this.getPointer(event));
                    break;
            }
        });
        __publicField(this, "onPointerDown", (event)=>{
            if (!this.enabled || !this.domElement) return;
            this.domElement.style.touchAction = "none";
            this.domElement.ownerDocument.addEventListener("pointermove", this.onPointerMove);
            this.pointerHover(this.getPointer(event));
            this.pointerDown(this.getPointer(event));
        });
        __publicField(this, "onPointerMove", (event)=>{
            if (!this.enabled) return;
            this.pointerMove(this.getPointer(event));
        });
        __publicField(this, "onPointerUp", (event)=>{
            if (!this.enabled || !this.domElement) return;
            this.domElement.style.touchAction = "";
            this.domElement.ownerDocument.removeEventListener("pointermove", this.onPointerMove);
            this.pointerUp(this.getPointer(event));
        });
        __publicField(this, "getMode", ()=>this.mode);
        __publicField(this, "setMode", (mode)=>{
            this.mode = mode;
        });
        __publicField(this, "setTranslationSnap", (translationSnap)=>{
            this.translationSnap = translationSnap;
        });
        __publicField(this, "setRotationSnap", (rotationSnap)=>{
            this.rotationSnap = rotationSnap;
        });
        __publicField(this, "setScaleSnap", (scaleSnap)=>{
            this.scaleSnap = scaleSnap;
        });
        __publicField(this, "setSize", (size)=>{
            this.size = size;
        });
        __publicField(this, "setSpace", (space)=>{
            this.space = space;
        });
        __publicField(this, "update", ()=>{
            console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.");
        });
        __publicField(this, "connect", (domElement)=>{
            if (domElement === document) {
                console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.');
            }
            this.domElement = domElement;
            this.domElement.addEventListener("pointerdown", this.onPointerDown);
            this.domElement.addEventListener("pointermove", this.onPointerHover);
            this.domElement.ownerDocument.addEventListener("pointerup", this.onPointerUp);
        });
        __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d, _e, _f;
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("pointerdown", this.onPointerDown);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("pointermove", this.onPointerHover);
            (_d = (_c = this.domElement) == null ? void 0 : _c.ownerDocument) == null ? void 0 : _d.removeEventListener("pointermove", this.onPointerMove);
            (_f = (_e = this.domElement) == null ? void 0 : _e.ownerDocument) == null ? void 0 : _f.removeEventListener("pointerup", this.onPointerUp);
            this.traverse((child)=>{
                const mesh = child;
                if (mesh.geometry) {
                    mesh.geometry.dispose();
                }
                if (mesh.material) {
                    mesh.material.dispose();
                }
            });
        });
        this.domElement = domElement;
        this.camera = camera;
        this.gizmo = new TransformControlsGizmo();
        this.add(this.gizmo);
        this.plane = new TransformControlsPlane();
        this.add(this.plane);
        const defineProperty = (propName, defaultValue)=>{
            let propValue = defaultValue;
            Object.defineProperty(this, propName, {
                get: function() {
                    return propValue !== void 0 ? propValue : defaultValue;
                },
                set: function(value) {
                    if (propValue !== value) {
                        propValue = value;
                        this.plane[propName] = value;
                        this.gizmo[propName] = value;
                        this.dispatchEvent({
                            type: propName + "-changed",
                            value
                        });
                        this.dispatchEvent(this.changeEvent);
                    }
                }
            });
            this[propName] = defaultValue;
            this.plane[propName] = defaultValue;
            this.gizmo[propName] = defaultValue;
        };
        defineProperty("camera", this.camera);
        defineProperty("object", this.object);
        defineProperty("enabled", this.enabled);
        defineProperty("axis", this.axis);
        defineProperty("mode", this.mode);
        defineProperty("translationSnap", this.translationSnap);
        defineProperty("rotationSnap", this.rotationSnap);
        defineProperty("scaleSnap", this.scaleSnap);
        defineProperty("space", this.space);
        defineProperty("size", this.size);
        defineProperty("dragging", this.dragging);
        defineProperty("showX", this.showX);
        defineProperty("showY", this.showY);
        defineProperty("showZ", this.showZ);
        defineProperty("worldPosition", this.worldPosition);
        defineProperty("worldPositionStart", this.worldPositionStart);
        defineProperty("worldQuaternion", this.worldQuaternion);
        defineProperty("worldQuaternionStart", this.worldQuaternionStart);
        defineProperty("cameraPosition", this.cameraPosition);
        defineProperty("cameraQuaternion", this.cameraQuaternion);
        defineProperty("pointStart", this.pointStart);
        defineProperty("pointEnd", this.pointEnd);
        defineProperty("rotationAxis", this.rotationAxis);
        defineProperty("rotationAngle", this.rotationAngle);
        defineProperty("eye", this.eye);
        if (domElement !== void 0) this.connect(domElement);
    }
}
class TransformControlsGizmo extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"] {
    constructor(){
        super();
        __publicField(this, "isTransformControlsGizmo", true);
        __publicField(this, "type", "TransformControlsGizmo");
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "tempEuler", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]());
        __publicField(this, "alignVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "zeroVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 0));
        __publicField(this, "lookAtMatrix", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]());
        __publicField(this, "tempQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "tempQuaternion2", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "identityQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "unitX", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0));
        __publicField(this, "unitY", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "unitZ", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "gizmo");
        __publicField(this, "picker");
        __publicField(this, "helper");
        // these are set from parent class TransformControls
        __publicField(this, "rotationAxis", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "cameraPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldPositionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternionStart", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "camera", null);
        __publicField(this, "enabled", true);
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "space", "world");
        __publicField(this, "size", 1);
        __publicField(this, "dragging", false);
        __publicField(this, "showX", true);
        __publicField(this, "showY", true);
        __publicField(this, "showZ", true);
        // updateMatrixWorld will update transformations and appearance of individual handles
        __publicField(this, "updateMatrixWorld", ()=>{
            let space = this.space;
            if (this.mode === "scale") {
                space = "local";
            }
            const quaternion = space === "local" ? this.worldQuaternion : this.identityQuaternion;
            this.gizmo["translate"].visible = this.mode === "translate";
            this.gizmo["rotate"].visible = this.mode === "rotate";
            this.gizmo["scale"].visible = this.mode === "scale";
            this.helper["translate"].visible = this.mode === "translate";
            this.helper["rotate"].visible = this.mode === "rotate";
            this.helper["scale"].visible = this.mode === "scale";
            let handles = [];
            handles = handles.concat(this.picker[this.mode].children);
            handles = handles.concat(this.gizmo[this.mode].children);
            handles = handles.concat(this.helper[this.mode].children);
            for(let i = 0; i < handles.length; i++){
                const handle = handles[i];
                handle.visible = true;
                handle.rotation.set(0, 0, 0);
                handle.position.copy(this.worldPosition);
                let factor;
                if (this.camera.isOrthographicCamera) {
                    factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
                } else {
                    factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7);
                }
                handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 7);
                if (handle.tag === "helper") {
                    handle.visible = false;
                    if (handle.name === "AXIS") {
                        handle.position.copy(this.worldPositionStart);
                        handle.visible = !!this.axis;
                        if (this.axis === "X") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, 0));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "Y") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, 0, Math.PI / 2));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "Z") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0));
                            handle.quaternion.copy(quaternion).multiply(this.tempQuaternion);
                            if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) > 0.9) {
                                handle.visible = false;
                            }
                        }
                        if (this.axis === "XYZE") {
                            this.tempQuaternion.setFromEuler(this.tempEuler.set(0, Math.PI / 2, 0));
                            this.alignVector.copy(this.rotationAxis);
                            handle.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.zeroVector, this.alignVector, this.unitY));
                            handle.quaternion.multiply(this.tempQuaternion);
                            handle.visible = this.dragging;
                        }
                        if (this.axis === "E") {
                            handle.visible = false;
                        }
                    } else if (handle.name === "START") {
                        handle.position.copy(this.worldPositionStart);
                        handle.visible = this.dragging;
                    } else if (handle.name === "END") {
                        handle.position.copy(this.worldPosition);
                        handle.visible = this.dragging;
                    } else if (handle.name === "DELTA") {
                        handle.position.copy(this.worldPositionStart);
                        handle.quaternion.copy(this.worldQuaternionStart);
                        this.tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
                        this.tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert());
                        handle.scale.copy(this.tempVector);
                        handle.visible = this.dragging;
                    } else {
                        handle.quaternion.copy(quaternion);
                        if (this.dragging) {
                            handle.position.copy(this.worldPositionStart);
                        } else {
                            handle.position.copy(this.worldPosition);
                        }
                        if (this.axis) {
                            handle.visible = this.axis.search(handle.name) !== -1;
                        }
                    }
                    continue;
                }
                handle.quaternion.copy(quaternion);
                if (this.mode === "translate" || this.mode === "scale") {
                    const AXIS_HIDE_TRESHOLD = 0.99;
                    const PLANE_HIDE_TRESHOLD = 0.2;
                    const AXIS_FLIP_TRESHOLD = 0;
                    if (handle.name === "X" || handle.name === "XYZX") {
                        if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "Y" || handle.name === "XYZY") {
                        if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "Z" || handle.name === "XYZZ") {
                        if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) > AXIS_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "XY") {
                        if (Math.abs(this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "YZ") {
                        if (Math.abs(this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name === "XZ") {
                        if (Math.abs(this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye)) < PLANE_HIDE_TRESHOLD) {
                            handle.scale.set(1e-10, 1e-10, 1e-10);
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("X") !== -1) {
                        if (this.alignVector.copy(this.unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.x *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("Y") !== -1) {
                        if (this.alignVector.copy(this.unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.y *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                    if (handle.name.search("Z") !== -1) {
                        if (this.alignVector.copy(this.unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
                            if (handle.tag === "fwd") {
                                handle.visible = false;
                            } else {
                                handle.scale.z *= -1;
                            }
                        } else if (handle.tag === "bwd") {
                            handle.visible = false;
                        }
                    }
                } else if (this.mode === "rotate") {
                    this.tempQuaternion2.copy(quaternion);
                    this.alignVector.copy(this.eye).applyQuaternion(this.tempQuaternion.copy(quaternion).invert());
                    if (handle.name.search("E") !== -1) {
                        handle.quaternion.setFromRotationMatrix(this.lookAtMatrix.lookAt(this.eye, this.zeroVector, this.unitY));
                    }
                    if (handle.name === "X") {
                        this.tempQuaternion.setFromAxisAngle(this.unitX, Math.atan2(-this.alignVector.y, this.alignVector.z));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                    if (handle.name === "Y") {
                        this.tempQuaternion.setFromAxisAngle(this.unitY, Math.atan2(this.alignVector.x, this.alignVector.z));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                    if (handle.name === "Z") {
                        this.tempQuaternion.setFromAxisAngle(this.unitZ, Math.atan2(this.alignVector.y, this.alignVector.x));
                        this.tempQuaternion.multiplyQuaternions(this.tempQuaternion2, this.tempQuaternion);
                        handle.quaternion.copy(this.tempQuaternion);
                    }
                }
                handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
                handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
                handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
                handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ);
                handle.material.tempOpacity = handle.material.tempOpacity || handle.material.opacity;
                handle.material.tempColor = handle.material.tempColor || handle.material.color.clone();
                handle.material.color.copy(handle.material.tempColor);
                handle.material.opacity = handle.material.tempOpacity;
                if (!this.enabled) {
                    handle.material.opacity *= 0.5;
                    handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                } else if (this.axis) {
                    if (handle.name === this.axis) {
                        handle.material.opacity = 1;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    } else if (this.axis.split("").some(function(a) {
                        return handle.name === a;
                    })) {
                        handle.material.opacity = 1;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    } else {
                        handle.material.opacity *= 0.25;
                        handle.material.color.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](1, 1, 1), 0.5);
                    }
                }
            }
            super.updateMatrixWorld();
        });
        const gizmoMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            fog: false,
            toneMapped: false
        });
        const gizmoLineMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            depthTest: false,
            depthWrite: false,
            transparent: true,
            linewidth: 1,
            fog: false,
            toneMapped: false
        });
        const matInvisible = gizmoMaterial.clone();
        matInvisible.opacity = 0.15;
        const matHelper = gizmoMaterial.clone();
        matHelper.opacity = 0.33;
        const matRed = gizmoMaterial.clone();
        matRed.color.set(16711680);
        const matGreen = gizmoMaterial.clone();
        matGreen.color.set(65280);
        const matBlue = gizmoMaterial.clone();
        matBlue.color.set(255);
        const matWhiteTransparent = gizmoMaterial.clone();
        matWhiteTransparent.opacity = 0.25;
        const matYellowTransparent = matWhiteTransparent.clone();
        matYellowTransparent.color.set(16776960);
        const matCyanTransparent = matWhiteTransparent.clone();
        matCyanTransparent.color.set(65535);
        const matMagentaTransparent = matWhiteTransparent.clone();
        matMagentaTransparent.color.set(16711935);
        const matYellow = gizmoMaterial.clone();
        matYellow.color.set(16776960);
        const matLineRed = gizmoLineMaterial.clone();
        matLineRed.color.set(16711680);
        const matLineGreen = gizmoLineMaterial.clone();
        matLineGreen.color.set(65280);
        const matLineBlue = gizmoLineMaterial.clone();
        matLineBlue.color.set(255);
        const matLineCyan = gizmoLineMaterial.clone();
        matLineCyan.color.set(65535);
        const matLineMagenta = gizmoLineMaterial.clone();
        matLineMagenta.color.set(16711935);
        const matLineYellow = gizmoLineMaterial.clone();
        matLineYellow.color.set(16776960);
        const matLineGray = gizmoLineMaterial.clone();
        matLineGray.color.set(7895160);
        const matLineYellowTransparent = matLineYellow.clone();
        matLineYellowTransparent.opacity = 0.25;
        const arrowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0, 0.05, 0.2, 12, 1, false);
        const scaleHandleGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125);
        const lineGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        lineGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
            0,
            0,
            0,
            1,
            0,
            0
        ], 3));
        const CircleGeometry = (radius, arc)=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const vertices = [];
            for(let i = 0; i <= 64 * arc; ++i){
                vertices.push(0, Math.cos(i / 32 * Math.PI) * radius, Math.sin(i / 32 * Math.PI) * radius);
            }
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](vertices, 3));
            return geometry;
        };
        const TranslateHelperGeometry = ()=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"]([
                0,
                0,
                0,
                1,
                1,
                1
            ], 3));
            return geometry;
        };
        const gizmoTranslate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matRed),
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ],
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matRed),
                    [
                        1,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineRed)
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matGreen),
                    [
                        0,
                        1,
                        0
                    ],
                    null,
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matGreen),
                    [
                        0,
                        1,
                        0
                    ],
                    [
                        Math.PI,
                        0,
                        0
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineGreen),
                    null,
                    [
                        0,
                        0,
                        Math.PI / 2
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matBlue),
                    [
                        0,
                        0,
                        1
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ],
                    null,
                    "fwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](arrowGeometry, matBlue),
                    [
                        0,
                        0,
                        1
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ],
                    null,
                    "bwd"
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineBlue),
                    null,
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ]
                ]
            ],
            XYZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.1, 0), matWhiteTransparent.clone()),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matYellowTransparent.clone()),
                    [
                        0.15,
                        0.15,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.18,
                        0.3,
                        0
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.3,
                        0.18,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matCyanTransparent.clone()),
                    [
                        0,
                        0.15,
                        0.15
                    ],
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.18,
                        0.3
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.3,
                        0.18
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.295, 0.295), matMagentaTransparent.clone()),
                    [
                        0.15,
                        0,
                        0.15
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.18,
                        0,
                        0.3
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.3,
                        0,
                        0.18
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ]
        };
        const pickerTranslate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0.6,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0,
                        0.6,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 1, 4, 1, false), matInvisible),
                    [
                        0,
                        0,
                        0.6
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            XYZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.2, 0), matInvisible)
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0.2,
                        0.2,
                        0
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0,
                        0.2,
                        0.2
                    ],
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](0.4, 0.4), matInvisible),
                    [
                        0.2,
                        0,
                        0.2
                    ],
                    [
                        -Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ]
        };
        const helperTranslate = {
            START: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.01, 2), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            END: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.01, 2), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            DELTA: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](TranslateHelperGeometry(), matHelper),
                    null,
                    null,
                    null,
                    "helper"
                ]
            ],
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        -1e3,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        0,
                        -1e3
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const gizmoRotate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineRed)
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matRed),
                    [
                        0,
                        0,
                        0.99
                    ],
                    null,
                    [
                        1,
                        3,
                        1
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineGreen),
                    null,
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matGreen),
                    [
                        0,
                        0,
                        0.99
                    ],
                    null,
                    [
                        3,
                        1,
                        1
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 0.5), matLineBlue),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OctahedronGeometry"](0.04, 0), matBlue),
                    [
                        0.99,
                        0,
                        0
                    ],
                    null,
                    [
                        1,
                        3,
                        1
                    ]
                ]
            ],
            E: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1.25, 1), matLineYellowTransparent),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        1.17,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        -1.17,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        0,
                        -1.17,
                        0
                    ],
                    [
                        Math.PI,
                        0,
                        0
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.03, 0, 0.15, 4, 1, false), matLineYellowTransparent),
                    [
                        0,
                        1.17,
                        0
                    ],
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        1,
                        1,
                        1e-3
                    ]
                ]
            ],
            XYZE: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](CircleGeometry(1, 1), matLineGray),
                    null,
                    [
                        0,
                        Math.PI / 2,
                        0
                    ]
                ]
            ]
        };
        const helperRotate = {
            AXIS: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const pickerRotate = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1, 0.1, 4, 24), matInvisible),
                    [
                        0,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            E: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](1.25, 0.1, 2, 24), matInvisible)
                ]
            ],
            XYZE: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.7, 10, 8), matInvisible)
                ]
            ]
        };
        const gizmoScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matRed),
                    [
                        0.8,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineRed),
                    null,
                    null,
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matGreen),
                    [
                        0,
                        0.8,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineGreen),
                    null,
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matBlue),
                    [
                        0,
                        0,
                        0.8
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineBlue),
                    null,
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.8,
                        1,
                        1
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matYellowTransparent),
                    [
                        0.85,
                        0.85,
                        0
                    ],
                    null,
                    [
                        2,
                        2,
                        0.2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.855,
                        0.98,
                        0
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineYellow),
                    [
                        0.98,
                        0.855,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matCyanTransparent),
                    [
                        0,
                        0.85,
                        0.85
                    ],
                    null,
                    [
                        0.2,
                        2,
                        2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.855,
                        0.98
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineCyan),
                    [
                        0,
                        0.98,
                        0.855
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matMagentaTransparent),
                    [
                        0.85,
                        0,
                        0.85
                    ],
                    null,
                    [
                        2,
                        0.2,
                        2
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.855,
                        0,
                        0.98
                    ],
                    null,
                    [
                        0.125,
                        1,
                        1
                    ]
                ],
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matLineMagenta),
                    [
                        0.98,
                        0,
                        0.855
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        0.125,
                        1,
                        1
                    ]
                ]
            ],
            XYZX: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        1.1,
                        0,
                        0
                    ]
                ]
            ],
            XYZY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        0,
                        1.1,
                        0
                    ]
                ]
            ],
            XYZZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.125, 0.125, 0.125), matWhiteTransparent.clone()),
                    [
                        0,
                        0,
                        1.1
                    ]
                ]
            ]
        };
        const pickerScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0.5,
                        0,
                        0
                    ],
                    [
                        0,
                        0,
                        -Math.PI / 2
                    ]
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0,
                        0.5,
                        0
                    ]
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.2, 0, 0.8, 4, 1, false), matInvisible),
                    [
                        0,
                        0,
                        0.5
                    ],
                    [
                        Math.PI / 2,
                        0,
                        0
                    ]
                ]
            ],
            XY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0.85,
                        0.85,
                        0
                    ],
                    null,
                    [
                        3,
                        3,
                        0.2
                    ]
                ]
            ],
            YZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0,
                        0.85,
                        0.85
                    ],
                    null,
                    [
                        0.2,
                        3,
                        3
                    ]
                ]
            ],
            XZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](scaleHandleGeometry, matInvisible),
                    [
                        0.85,
                        0,
                        0.85
                    ],
                    null,
                    [
                        3,
                        0.2,
                        3
                    ]
                ]
            ],
            XYZX: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        1.1,
                        0,
                        0
                    ]
                ]
            ],
            XYZY: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        0,
                        1.1,
                        0
                    ]
                ]
            ],
            XYZZ: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.2, 0.2, 0.2), matInvisible),
                    [
                        0,
                        0,
                        1.1
                    ]
                ]
            ]
        };
        const helperScale = {
            X: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        -1e3,
                        0,
                        0
                    ],
                    null,
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Y: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        -1e3,
                        0
                    ],
                    [
                        0,
                        0,
                        Math.PI / 2
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ],
            Z: [
                [
                    new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](lineGeometry, matHelper.clone()),
                    [
                        0,
                        0,
                        -1e3
                    ],
                    [
                        0,
                        -Math.PI / 2,
                        0
                    ],
                    [
                        1e6,
                        1,
                        1
                    ],
                    "helper"
                ]
            ]
        };
        const setupGizmo = (gizmoMap)=>{
            const gizmo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
            for(let name in gizmoMap){
                for(let i = gizmoMap[name].length; i--;){
                    const object = gizmoMap[name][i][0].clone();
                    const position = gizmoMap[name][i][1];
                    const rotation = gizmoMap[name][i][2];
                    const scale = gizmoMap[name][i][3];
                    const tag = gizmoMap[name][i][4];
                    object.name = name;
                    object.tag = tag;
                    if (position) {
                        object.position.set(position[0], position[1], position[2]);
                    }
                    if (rotation) {
                        object.rotation.set(rotation[0], rotation[1], rotation[2]);
                    }
                    if (scale) {
                        object.scale.set(scale[0], scale[1], scale[2]);
                    }
                    object.updateMatrix();
                    const tempGeometry = object.geometry.clone();
                    tempGeometry.applyMatrix4(object.matrix);
                    object.geometry = tempGeometry;
                    object.renderOrder = Infinity;
                    object.position.set(0, 0, 0);
                    object.rotation.set(0, 0, 0);
                    object.scale.set(1, 1, 1);
                    gizmo.add(object);
                }
            }
            return gizmo;
        };
        this.gizmo = {};
        this.picker = {};
        this.helper = {};
        this.add(this.gizmo["translate"] = setupGizmo(gizmoTranslate));
        this.add(this.gizmo["rotate"] = setupGizmo(gizmoRotate));
        this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
        this.add(this.picker["translate"] = setupGizmo(pickerTranslate));
        this.add(this.picker["rotate"] = setupGizmo(pickerRotate));
        this.add(this.picker["scale"] = setupGizmo(pickerScale));
        this.add(this.helper["translate"] = setupGizmo(helperTranslate));
        this.add(this.helper["rotate"] = setupGizmo(helperRotate));
        this.add(this.helper["scale"] = setupGizmo(helperScale));
        this.picker["translate"].visible = false;
        this.picker["rotate"].visible = false;
        this.picker["scale"].visible = false;
    }
}
class TransformControlsPlane extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
    constructor(){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](1e5, 1e5, 2, 2), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            visible: false,
            wireframe: true,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
            transparent: true,
            opacity: 0.1,
            toneMapped: false
        }));
        __publicField(this, "isTransformControlsPlane", true);
        __publicField(this, "type", "TransformControlsPlane");
        __publicField(this, "unitX", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0));
        __publicField(this, "unitY", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0));
        __publicField(this, "unitZ", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1));
        __publicField(this, "tempVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "dirVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "alignVector", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "tempMatrix", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]());
        __publicField(this, "identityQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        // these are set from parent class TransformControls
        __publicField(this, "cameraQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "worldPosition", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "worldQuaternion", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]());
        __publicField(this, "eye", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "axis", null);
        __publicField(this, "mode", "translate");
        __publicField(this, "space", "world");
        __publicField(this, "updateMatrixWorld", ()=>{
            let space = this.space;
            this.position.copy(this.worldPosition);
            if (this.mode === "scale") space = "local";
            this.unitX.set(1, 0, 0).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.unitY.set(0, 1, 0).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.unitZ.set(0, 0, 1).applyQuaternion(space === "local" ? this.worldQuaternion : this.identityQuaternion);
            this.alignVector.copy(this.unitY);
            switch(this.mode){
                case "translate":
                case "scale":
                    switch(this.axis){
                        case "X":
                            this.alignVector.copy(this.eye).cross(this.unitX);
                            this.dirVector.copy(this.unitX).cross(this.alignVector);
                            break;
                        case "Y":
                            this.alignVector.copy(this.eye).cross(this.unitY);
                            this.dirVector.copy(this.unitY).cross(this.alignVector);
                            break;
                        case "Z":
                            this.alignVector.copy(this.eye).cross(this.unitZ);
                            this.dirVector.copy(this.unitZ).cross(this.alignVector);
                            break;
                        case "XY":
                            this.dirVector.copy(this.unitZ);
                            break;
                        case "YZ":
                            this.dirVector.copy(this.unitX);
                            break;
                        case "XZ":
                            this.alignVector.copy(this.unitZ);
                            this.dirVector.copy(this.unitY);
                            break;
                        case "XYZ":
                        case "E":
                            this.dirVector.set(0, 0, 0);
                            break;
                    }
                    break;
                case "rotate":
                default:
                    this.dirVector.set(0, 0, 0);
            }
            if (this.dirVector.length() === 0) {
                this.quaternion.copy(this.cameraQuaternion);
            } else {
                this.tempMatrix.lookAt(this.tempVector.set(0, 0, 0), this.dirVector, this.alignVector);
                this.quaternion.setFromRotationMatrix(this.tempMatrix);
            }
            super.updateMatrixWorld();
        });
    }
}
;
 //# sourceMappingURL=TransformControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/PointerLockControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PointerLockControls",
    ()=>PointerLockControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const _euler = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, 0, 0, "YXZ");
const _vector = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _changeEvent = {
    type: "change"
};
const _lockEvent = {
    type: "lock"
};
const _unlockEvent = {
    type: "unlock"
};
const _MOUSE_SENSITIVITY = 2e-3;
const _PI_2 = Math.PI / 2;
class PointerLockControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(camera, domElement){
        super();
        __publicField(this, "camera");
        __publicField(this, "domElement");
        __publicField(this, "isLocked");
        __publicField(this, "minPolarAngle");
        __publicField(this, "maxPolarAngle");
        __publicField(this, "pointerSpeed");
        __publicField(this, "onMouseMove", (event)=>{
            if (!this.domElement || this.isLocked === false) return;
            _euler.setFromQuaternion(this.camera.quaternion);
            _euler.y -= event.movementX * _MOUSE_SENSITIVITY * this.pointerSpeed;
            _euler.x -= event.movementY * _MOUSE_SENSITIVITY * this.pointerSpeed;
            _euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
            this.camera.quaternion.setFromEuler(_euler);
            this.dispatchEvent(_changeEvent);
        });
        __publicField(this, "onPointerlockChange", ()=>{
            if (!this.domElement) return;
            if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
                this.dispatchEvent(_lockEvent);
                this.isLocked = true;
            } else {
                this.dispatchEvent(_unlockEvent);
                this.isLocked = false;
            }
        });
        __publicField(this, "onPointerlockError", ()=>{
            console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
        });
        __publicField(this, "connect", (domElement)=>{
            this.domElement = domElement || this.domElement;
            if (!this.domElement) return;
            this.domElement.ownerDocument.addEventListener("mousemove", this.onMouseMove);
            this.domElement.ownerDocument.addEventListener("pointerlockchange", this.onPointerlockChange);
            this.domElement.ownerDocument.addEventListener("pointerlockerror", this.onPointerlockError);
        });
        __publicField(this, "disconnect", ()=>{
            if (!this.domElement) return;
            this.domElement.ownerDocument.removeEventListener("mousemove", this.onMouseMove);
            this.domElement.ownerDocument.removeEventListener("pointerlockchange", this.onPointerlockChange);
            this.domElement.ownerDocument.removeEventListener("pointerlockerror", this.onPointerlockError);
        });
        __publicField(this, "dispose", ()=>{
            this.disconnect();
        });
        __publicField(this, "getObject", ()=>{
            return this.camera;
        });
        __publicField(this, "direction", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, -1));
        __publicField(this, "getDirection", (v)=>{
            return v.copy(this.direction).applyQuaternion(this.camera.quaternion);
        });
        __publicField(this, "moveForward", (distance)=>{
            _vector.setFromMatrixColumn(this.camera.matrix, 0);
            _vector.crossVectors(this.camera.up, _vector);
            this.camera.position.addScaledVector(_vector, distance);
        });
        __publicField(this, "moveRight", (distance)=>{
            _vector.setFromMatrixColumn(this.camera.matrix, 0);
            this.camera.position.addScaledVector(_vector, distance);
        });
        __publicField(this, "lock", ()=>{
            if (this.domElement) this.domElement.requestPointerLock();
        });
        __publicField(this, "unlock", ()=>{
            if (this.domElement) this.domElement.ownerDocument.exitPointerLock();
        });
        this.camera = camera;
        this.domElement = domElement;
        this.isLocked = false;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.pointerSpeed = 1;
        if (domElement) this.connect(domElement);
    }
}
;
 //# sourceMappingURL=PointerLockControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/FirstPersonControls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FirstPersonControls",
    ()=>FirstPersonControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/controls/EventDispatcher.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const targetPosition = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
class FirstPersonControls extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$controls$2f$EventDispatcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDispatcher"] {
    constructor(object, domElement){
        super();
        __publicField(this, "object");
        __publicField(this, "domElement");
        __publicField(this, "enabled", true);
        __publicField(this, "movementSpeed", 1);
        __publicField(this, "lookSpeed", 5e-3);
        __publicField(this, "lookVertical", true);
        __publicField(this, "autoForward", false);
        __publicField(this, "activeLook", true);
        __publicField(this, "heightSpeed", false);
        __publicField(this, "heightCoef", 1);
        __publicField(this, "heightMin", 0);
        __publicField(this, "heightMax", 1);
        __publicField(this, "constrainVertical", false);
        __publicField(this, "verticalMin", 0);
        __publicField(this, "verticalMax", Math.PI);
        __publicField(this, "mouseDragOn", false);
        // internals
        __publicField(this, "autoSpeedFactor", 0);
        __publicField(this, "mouseX", 0);
        __publicField(this, "mouseY", 0);
        __publicField(this, "moveForward", false);
        __publicField(this, "moveBackward", false);
        __publicField(this, "moveLeft", false);
        __publicField(this, "moveRight", false);
        __publicField(this, "moveUp", false);
        __publicField(this, "moveDown", false);
        __publicField(this, "viewHalfX", 0);
        __publicField(this, "viewHalfY", 0);
        __publicField(this, "lat", 0);
        __publicField(this, "lon", 0);
        __publicField(this, "lookDirection", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "spherical", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]());
        __publicField(this, "target", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
        __publicField(this, "connect", (domElement)=>{
            domElement.setAttribute("tabindex", "-1");
            domElement.style.touchAction = "none";
            domElement.addEventListener("contextmenu", this.contextmenu);
            domElement.addEventListener("mousemove", this.onMouseMove);
            domElement.addEventListener("mousedown", this.onMouseDown);
            domElement.addEventListener("mouseup", this.onMouseUp);
            this.domElement = domElement;
            window.addEventListener("keydown", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
            this.handleResize();
        });
        __publicField(this, "dispose", ()=>{
            var _a, _b, _c, _d;
            (_a = this.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", this.contextmenu);
            (_b = this.domElement) == null ? void 0 : _b.removeEventListener("mousedown", this.onMouseDown);
            (_c = this.domElement) == null ? void 0 : _c.removeEventListener("mousemove", this.onMouseMove);
            (_d = this.domElement) == null ? void 0 : _d.removeEventListener("mouseup", this.onMouseUp);
            window.removeEventListener("keydown", this.onKeyDown);
            window.removeEventListener("keyup", this.onKeyUp);
        });
        __publicField(this, "handleResize", ()=>{
            if (this.domElement) {
                this.viewHalfX = this.domElement.offsetWidth / 2;
                this.viewHalfY = this.domElement.offsetHeight / 2;
            }
        });
        __publicField(this, "onMouseDown", (event)=>{
            var _a;
            (_a = this.domElement) == null ? void 0 : _a.focus();
            if (this.activeLook) {
                switch(event.button){
                    case 0:
                        this.moveForward = true;
                        break;
                    case 2:
                        this.moveBackward = true;
                        break;
                }
            }
            this.mouseDragOn = true;
        });
        __publicField(this, "onMouseUp", (event)=>{
            if (this.activeLook) {
                switch(event.button){
                    case 0:
                        this.moveForward = false;
                        break;
                    case 2:
                        this.moveBackward = false;
                        break;
                }
            }
            this.mouseDragOn = false;
        });
        __publicField(this, "onMouseMove", (event)=>{
            if (this.domElement) {
                this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
                this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
            }
        });
        __publicField(this, "onKeyDown", (event)=>{
            switch(event.code){
                case "ArrowUp":
                case "KeyW":
                    this.moveForward = true;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.moveRight = true;
                    break;
                case "KeyR":
                    this.moveUp = true;
                    break;
                case "KeyF":
                    this.moveDown = true;
                    break;
            }
        });
        __publicField(this, "onKeyUp", (event)=>{
            switch(event.code){
                case "ArrowUp":
                case "KeyW":
                    this.moveForward = false;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.moveLeft = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.moveBackward = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.moveRight = false;
                    break;
                case "KeyR":
                    this.moveUp = false;
                    break;
                case "KeyF":
                    this.moveDown = false;
                    break;
            }
        });
        __publicField(this, "lookAt", (x, y, z)=>{
            if (x instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]) {
                this.target.copy(x);
            } else if (y && z) {
                this.target.set(x, y, z);
            }
            this.object.lookAt(this.target);
            this.setOrientation();
            return this;
        });
        __publicField(this, "update", (delta)=>{
            if (!this.enabled) return;
            if (this.heightSpeed) {
                const y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(this.object.position.y, this.heightMin, this.heightMax);
                const heightDelta = y - this.heightMin;
                this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
            } else {
                this.autoSpeedFactor = 0;
            }
            const actualMoveSpeed = delta * this.movementSpeed;
            if (this.moveForward || this.autoForward && !this.moveBackward) {
                this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
            }
            if (this.moveBackward) this.object.translateZ(actualMoveSpeed);
            if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
            if (this.moveRight) this.object.translateX(actualMoveSpeed);
            if (this.moveUp) this.object.translateY(actualMoveSpeed);
            if (this.moveDown) this.object.translateY(-actualMoveSpeed);
            let actualLookSpeed = delta * this.lookSpeed;
            if (!this.activeLook) {
                actualLookSpeed = 0;
            }
            let verticalLookRatio = 1;
            if (this.constrainVertical) {
                verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
            }
            this.lon -= this.mouseX * actualLookSpeed;
            if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
            this.lat = Math.max(-85, Math.min(85, this.lat));
            let phi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(90 - this.lat);
            const theta = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(this.lon);
            if (this.constrainVertical) {
                phi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].mapLinear(phi, 0, Math.PI, this.verticalMin, this.verticalMax);
            }
            const position = this.object.position;
            targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
            this.object.lookAt(targetPosition);
        });
        __publicField(this, "contextmenu", (event)=>event.preventDefault());
        __publicField(this, "setOrientation", ()=>{
            this.lookDirection.set(0, 0, -1).applyQuaternion(this.object.quaternion);
            this.spherical.setFromVector3(this.lookDirection);
            this.lat = 90 - __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(this.spherical.phi);
            this.lon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].radToDeg(this.spherical.theta);
        });
        this.object = object;
        this.domElement = domElement;
        this.setOrientation();
        if (domElement) this.connect(domElement);
    }
}
;
 //# sourceMappingURL=FirstPersonControls.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/curves/NURBSUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcBSplineDerivatives",
    ()=>calcBSplineDerivatives,
    "calcBSplinePoint",
    ()=>calcBSplinePoint,
    "calcBasisFunctionDerivatives",
    ()=>calcBasisFunctionDerivatives,
    "calcBasisFunctions",
    ()=>calcBasisFunctions,
    "calcKoverI",
    ()=>calcKoverI,
    "calcNURBSDerivatives",
    ()=>calcNURBSDerivatives,
    "calcRationalCurveDerivatives",
    ()=>calcRationalCurveDerivatives,
    "calcSurfacePoint",
    ()=>calcSurfacePoint,
    "findSpan",
    ()=>findSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function findSpan(p, u, U) {
    const n = U.length - p - 1;
    if (u >= U[n]) {
        return n - 1;
    }
    if (u <= U[p]) {
        return p;
    }
    let low = p;
    let high = n;
    let mid = Math.floor((low + high) / 2);
    while(u < U[mid] || u >= U[mid + 1]){
        if (u < U[mid]) {
            high = mid;
        } else {
            low = mid;
        }
        mid = Math.floor((low + high) / 2);
    }
    return mid;
}
function calcBasisFunctions(span, u, p, U) {
    const N = [];
    const left = [];
    const right = [];
    N[0] = 1;
    for(let j = 1; j <= p; ++j){
        left[j] = u - U[span + 1 - j];
        right[j] = U[span + j] - u;
        let saved = 0;
        for(let r = 0; r < j; ++r){
            const rv = right[r + 1];
            const lv = left[j - r];
            const temp = N[r] / (rv + lv);
            N[r] = saved + rv * temp;
            saved = lv * temp;
        }
        N[j] = saved;
    }
    return N;
}
function calcBSplinePoint(p, U, P, u) {
    const span = findSpan(p, u, U);
    const N = calcBasisFunctions(span, u, p, U);
    const C = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
    for(let j = 0; j <= p; ++j){
        const point = P[span - p + j];
        const Nj = N[j];
        const wNj = point.w * Nj;
        C.x += point.x * wNj;
        C.y += point.y * wNj;
        C.z += point.z * wNj;
        C.w += point.w * Nj;
    }
    return C;
}
function calcBasisFunctionDerivatives(span, u, p, n, U) {
    const zeroArr = [];
    for(let i = 0; i <= p; ++i)zeroArr[i] = 0;
    const ders = [];
    for(let i = 0; i <= n; ++i)ders[i] = zeroArr.slice(0);
    const ndu = [];
    for(let i = 0; i <= p; ++i)ndu[i] = zeroArr.slice(0);
    ndu[0][0] = 1;
    const left = zeroArr.slice(0);
    const right = zeroArr.slice(0);
    for(let j = 1; j <= p; ++j){
        left[j] = u - U[span + 1 - j];
        right[j] = U[span + j] - u;
        let saved = 0;
        for(let r2 = 0; r2 < j; ++r2){
            const rv = right[r2 + 1];
            const lv = left[j - r2];
            ndu[j][r2] = rv + lv;
            const temp = ndu[r2][j - 1] / ndu[j][r2];
            ndu[r2][j] = saved + rv * temp;
            saved = lv * temp;
        }
        ndu[j][j] = saved;
    }
    for(let j = 0; j <= p; ++j){
        ders[0][j] = ndu[j][p];
    }
    for(let r2 = 0; r2 <= p; ++r2){
        let s1 = 0;
        let s2 = 1;
        const a = [];
        for(let i = 0; i <= p; ++i){
            a[i] = zeroArr.slice(0);
        }
        a[0][0] = 1;
        for(let k = 1; k <= n; ++k){
            let d = 0;
            const rk = r2 - k;
            const pk = p - k;
            if (r2 >= k) {
                a[s2][0] = a[s1][0] / ndu[pk + 1][rk];
                d = a[s2][0] * ndu[rk][pk];
            }
            const j1 = rk >= -1 ? 1 : -rk;
            const j2 = r2 - 1 <= pk ? k - 1 : p - r2;
            for(let j3 = j1; j3 <= j2; ++j3){
                a[s2][j3] = (a[s1][j3] - a[s1][j3 - 1]) / ndu[pk + 1][rk + j3];
                d += a[s2][j3] * ndu[rk + j3][pk];
            }
            if (r2 <= pk) {
                a[s2][k] = -a[s1][k - 1] / ndu[pk + 1][r2];
                d += a[s2][k] * ndu[r2][pk];
            }
            ders[k][r2] = d;
            const j = s1;
            s1 = s2;
            s2 = j;
        }
    }
    let r = p;
    for(let k = 1; k <= n; ++k){
        for(let j = 0; j <= p; ++j){
            ders[k][j] *= r;
        }
        r *= p - k;
    }
    return ders;
}
function calcBSplineDerivatives(p, U, P, u, nd) {
    const du = nd < p ? nd : p;
    const CK = [];
    const span = findSpan(p, u, U);
    const nders = calcBasisFunctionDerivatives(span, u, p, du, U);
    const Pw = [];
    for(let i = 0; i < P.length; ++i){
        const point = P[i].clone();
        const w = point.w;
        point.x *= w;
        point.y *= w;
        point.z *= w;
        Pw[i] = point;
    }
    for(let k = 0; k <= du; ++k){
        const point = Pw[span - p].clone().multiplyScalar(nders[k][0]);
        for(let j = 1; j <= p; ++j){
            point.add(Pw[span - p + j].clone().multiplyScalar(nders[k][j]));
        }
        CK[k] = point;
    }
    for(let k = du + 1; k <= nd + 1; ++k){
        CK[k] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0);
    }
    return CK;
}
function calcKoverI(k, i) {
    let nom = 1;
    for(let j = 2; j <= k; ++j){
        nom *= j;
    }
    let denom = 1;
    for(let j = 2; j <= i; ++j){
        denom *= j;
    }
    for(let j = 2; j <= k - i; ++j){
        denom *= j;
    }
    return nom / denom;
}
function calcRationalCurveDerivatives(Pders) {
    const nd = Pders.length;
    const Aders = [];
    const wders = [];
    for(let i = 0; i < nd; ++i){
        const point = Pders[i];
        Aders[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](point.x, point.y, point.z);
        wders[i] = point.w;
    }
    const CK = [];
    for(let k = 0; k < nd; ++k){
        const v = Aders[k].clone();
        for(let i = 1; i <= k; ++i){
            v.sub(CK[k - i].clone().multiplyScalar(calcKoverI(k, i) * wders[i]));
        }
        CK[k] = v.divideScalar(wders[0]);
    }
    return CK;
}
function calcNURBSDerivatives(p, U, P, u, nd) {
    const Pders = calcBSplineDerivatives(p, U, P, u, nd);
    return calcRationalCurveDerivatives(Pders);
}
function calcSurfacePoint(p, q, U, V, P, u, v, target) {
    const uspan = findSpan(p, u, U);
    const vspan = findSpan(q, v, V);
    const Nu = calcBasisFunctions(uspan, u, p, U);
    const Nv = calcBasisFunctions(vspan, v, q, V);
    const temp = [];
    for(let l = 0; l <= q; ++l){
        temp[l] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
        for(let k = 0; k <= p; ++k){
            const point = P[uspan - p + k][vspan - q + l].clone();
            const w = point.w;
            point.x *= w;
            point.y *= w;
            point.z *= w;
            temp[l].add(point.multiplyScalar(Nu[k]));
        }
    }
    const Sw = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0);
    for(let l = 0; l <= q; ++l){
        Sw.add(temp[l].multiplyScalar(Nv[l]));
    }
    Sw.divideScalar(Sw.w);
    target.set(Sw.x, Sw.y, Sw.z);
}
;
 //# sourceMappingURL=NURBSUtils.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/curves/NURBSCurve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NURBSCurve",
    ()=>NURBSCurve
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/curves/NURBSUtils.js [app-client] (ecmascript)");
;
;
class NURBSCurve extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Curve"] {
    constructor(degree, knots, controlPoints, startKnot, endKnot){
        super();
        this.degree = degree;
        this.knots = knots;
        this.controlPoints = [];
        this.startKnot = startKnot || 0;
        this.endKnot = endKnot || this.knots.length - 1;
        for(let i = 0; i < controlPoints.length; ++i){
            const point = controlPoints[i];
            this.controlPoints[i] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](point.x, point.y, point.z, point.w);
        }
    }
    getPoint(t, optionalTarget) {
        const point = optionalTarget || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const u = this.knots[this.startKnot] + t * (this.knots[this.endKnot] - this.knots[this.startKnot]);
        const hpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcBSplinePoint"])(this.degree, this.knots, this.controlPoints, u);
        if (hpoint.w != 1) {
            hpoint.divideScalar(hpoint.w);
        }
        return point.set(hpoint.x, hpoint.y, hpoint.z);
    }
    getTangent(t, optionalTarget) {
        const tangent = optionalTarget || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        const u = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0]);
        const ders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcNURBSDerivatives"])(this.degree, this.knots, this.controlPoints, u, 1);
        tangent.copy(ders[1]).normalize();
        return tangent;
    }
}
;
 //# sourceMappingURL=NURBSCurve.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/loaders/FBXLoader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FBXLoader",
    ()=>FBXLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$10$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/fflate@0.6.10/node_modules/fflate/esm/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/curves/NURBSCurve.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/LoaderUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/uv1.js [app-client] (ecmascript)");
;
;
;
;
;
let fbxTree;
let connections;
let sceneGraph;
class FBXLoader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
    constructor(manager){
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const path = scope.path === "" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoaderUtils"].extractUrlBase(url) : scope.path;
        const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
        loader.setPath(scope.path);
        loader.setResponseType("arraybuffer");
        loader.setRequestHeader(scope.requestHeader);
        loader.setWithCredentials(scope.withCredentials);
        loader.load(url, function(buffer) {
            try {
                onLoad(scope.parse(buffer, path));
            } catch (e) {
                if (onError) {
                    onError(e);
                } else {
                    console.error(e);
                }
                scope.manager.itemError(url);
            }
        }, onProgress, onError);
    }
    parse(FBXBuffer, path) {
        if (isFbxFormatBinary(FBXBuffer)) {
            fbxTree = new BinaryParser().parse(FBXBuffer);
        } else {
            const FBXText = convertArrayBufferToString(FBXBuffer);
            if (!isFbxFormatASCII(FBXText)) {
                throw new Error("THREE.FBXLoader: Unknown format.");
            }
            if (getFbxVersion(FBXText) < 7e3) {
                throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + getFbxVersion(FBXText));
            }
            fbxTree = new TextParser().parse(FBXText);
        }
        const textureLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"](this.manager).setPath(this.resourcePath || path).setCrossOrigin(this.crossOrigin);
        return new FBXTreeParser(textureLoader, this.manager).parse(fbxTree);
    }
}
class FBXTreeParser {
    constructor(textureLoader, manager){
        this.textureLoader = textureLoader;
        this.manager = manager;
    }
    parse() {
        connections = this.parseConnections();
        const images = this.parseImages();
        const textures = this.parseTextures(images);
        const materials = this.parseMaterials(textures);
        const deformers = this.parseDeformers();
        const geometryMap = new GeometryParser().parse(deformers);
        this.parseScene(deformers, geometryMap, materials);
        return sceneGraph;
    }
    // Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
    // and details the connection type
    parseConnections() {
        const connectionMap = /* @__PURE__ */ new Map();
        if ("Connections" in fbxTree) {
            const rawConnections = fbxTree.Connections.connections;
            rawConnections.forEach(function(rawConnection) {
                const fromID = rawConnection[0];
                const toID = rawConnection[1];
                const relationship = rawConnection[2];
                if (!connectionMap.has(fromID)) {
                    connectionMap.set(fromID, {
                        parents: [],
                        children: []
                    });
                }
                const parentRelationship = {
                    ID: toID,
                    relationship
                };
                connectionMap.get(fromID).parents.push(parentRelationship);
                if (!connectionMap.has(toID)) {
                    connectionMap.set(toID, {
                        parents: [],
                        children: []
                    });
                }
                const childRelationship = {
                    ID: fromID,
                    relationship
                };
                connectionMap.get(toID).children.push(childRelationship);
            });
        }
        return connectionMap;
    }
    // Parse FBXTree.Objects.Video for embedded image data
    // These images are connected to textures in FBXTree.Objects.Textures
    // via FBXTree.Connections.
    parseImages() {
        const images = {};
        const blobs = {};
        if ("Video" in fbxTree.Objects) {
            const videoNodes = fbxTree.Objects.Video;
            for(const nodeID in videoNodes){
                const videoNode = videoNodes[nodeID];
                const id = parseInt(nodeID);
                images[id] = videoNode.RelativeFilename || videoNode.Filename;
                if ("Content" in videoNode) {
                    const arrayBufferContent = videoNode.Content instanceof ArrayBuffer && videoNode.Content.byteLength > 0;
                    const base64Content = typeof videoNode.Content === "string" && videoNode.Content !== "";
                    if (arrayBufferContent || base64Content) {
                        const image = this.parseImage(videoNodes[nodeID]);
                        blobs[videoNode.RelativeFilename || videoNode.Filename] = image;
                    }
                }
            }
        }
        for(const id in images){
            const filename = images[id];
            if (blobs[filename] !== void 0) images[id] = blobs[filename];
            else images[id] = images[id].split("\\").pop();
        }
        return images;
    }
    // Parse embedded image data in FBXTree.Video.Content
    parseImage(videoNode) {
        const content = videoNode.Content;
        const fileName = videoNode.RelativeFilename || videoNode.Filename;
        const extension = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
        let type;
        switch(extension){
            case "bmp":
                type = "image/bmp";
                break;
            case "jpg":
            case "jpeg":
                type = "image/jpeg";
                break;
            case "png":
                type = "image/png";
                break;
            case "tif":
                type = "image/tiff";
                break;
            case "tga":
                if (this.manager.getHandler(".tga") === null) {
                    console.warn("FBXLoader: TGA loader not found, skipping ", fileName);
                }
                type = "image/tga";
                break;
            default:
                console.warn('FBXLoader: Image type "' + extension + '" is not supported.');
                return;
        }
        if (typeof content === "string") {
            return "data:" + type + ";base64," + content;
        } else {
            const array = new Uint8Array(content);
            return window.URL.createObjectURL(new Blob([
                array
            ], {
                type
            }));
        }
    }
    // Parse nodes in FBXTree.Objects.Texture
    // These contain details such as UV scaling, cropping, rotation etc and are connected
    // to images in FBXTree.Objects.Video
    parseTextures(images) {
        const textureMap = /* @__PURE__ */ new Map();
        if ("Texture" in fbxTree.Objects) {
            const textureNodes = fbxTree.Objects.Texture;
            for(const nodeID in textureNodes){
                const texture = this.parseTexture(textureNodes[nodeID], images);
                textureMap.set(parseInt(nodeID), texture);
            }
        }
        return textureMap;
    }
    // Parse individual node in FBXTree.Objects.Texture
    parseTexture(textureNode, images) {
        const texture = this.loadTexture(textureNode, images);
        texture.ID = textureNode.id;
        texture.name = textureNode.attrName;
        const wrapModeU = textureNode.WrapModeU;
        const wrapModeV = textureNode.WrapModeV;
        const valueU = wrapModeU !== void 0 ? wrapModeU.value : 0;
        const valueV = wrapModeV !== void 0 ? wrapModeV.value : 0;
        texture.wrapS = valueU === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        texture.wrapT = valueV === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        if ("Scaling" in textureNode) {
            const values = textureNode.Scaling.value;
            texture.repeat.x = values[0];
            texture.repeat.y = values[1];
        }
        return texture;
    }
    // load a texture specified as a blob or data URI, or via an external URL using TextureLoader
    loadTexture(textureNode, images) {
        let fileName;
        const currentPath = this.textureLoader.path;
        const children = connections.get(textureNode.id).children;
        if (children !== void 0 && children.length > 0 && images[children[0].ID] !== void 0) {
            fileName = images[children[0].ID];
            if (fileName.indexOf("blob:") === 0 || fileName.indexOf("data:") === 0) {
                this.textureLoader.setPath(void 0);
            }
        }
        let texture;
        const extension = textureNode.FileName.slice(-3).toLowerCase();
        if (extension === "tga") {
            const loader = this.manager.getHandler(".tga");
            if (loader === null) {
                console.warn("FBXLoader: TGA loader not found, creating placeholder texture for", textureNode.RelativeFilename);
                texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]();
            } else {
                loader.setPath(this.textureLoader.path);
                texture = loader.load(fileName);
            }
        } else if (extension === "psd") {
            console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for", textureNode.RelativeFilename);
            texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"]();
        } else {
            texture = this.textureLoader.load(fileName);
        }
        this.textureLoader.setPath(currentPath);
        return texture;
    }
    // Parse nodes in FBXTree.Objects.Material
    parseMaterials(textureMap) {
        const materialMap = /* @__PURE__ */ new Map();
        if ("Material" in fbxTree.Objects) {
            const materialNodes = fbxTree.Objects.Material;
            for(const nodeID in materialNodes){
                const material = this.parseMaterial(materialNodes[nodeID], textureMap);
                if (material !== null) materialMap.set(parseInt(nodeID), material);
            }
        }
        return materialMap;
    }
    // Parse single node in FBXTree.Objects.Material
    // Materials are connected to texture maps in FBXTree.Objects.Textures
    // FBX format currently only supports Lambert and Phong shading models
    parseMaterial(materialNode, textureMap) {
        const ID = materialNode.id;
        const name = materialNode.attrName;
        let type = materialNode.ShadingModel;
        if (typeof type === "object") {
            type = type.value;
        }
        if (!connections.has(ID)) return null;
        const parameters = this.parseParameters(materialNode, textureMap, ID);
        let material;
        switch(type.toLowerCase()){
            case "phong":
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]();
                break;
            case "lambert":
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]();
                break;
            default:
                console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type);
                material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]();
                break;
        }
        material.setValues(parameters);
        material.name = name;
        return material;
    }
    // Parse FBX material and return parameters suitable for a three.js material
    // Also parse the texture map and return any textures associated with the material
    parseParameters(materialNode, textureMap, ID) {
        const parameters = {};
        if (materialNode.BumpFactor) {
            parameters.bumpScale = materialNode.BumpFactor.value;
        }
        if (materialNode.Diffuse) {
            parameters.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Diffuse.value);
        } else if (materialNode.DiffuseColor && (materialNode.DiffuseColor.type === "Color" || materialNode.DiffuseColor.type === "ColorRGB")) {
            parameters.color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.DiffuseColor.value);
        }
        if (materialNode.DisplacementFactor) {
            parameters.displacementScale = materialNode.DisplacementFactor.value;
        }
        if (materialNode.Emissive) {
            parameters.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Emissive.value);
        } else if (materialNode.EmissiveColor && (materialNode.EmissiveColor.type === "Color" || materialNode.EmissiveColor.type === "ColorRGB")) {
            parameters.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.EmissiveColor.value);
        }
        if (materialNode.EmissiveFactor) {
            parameters.emissiveIntensity = parseFloat(materialNode.EmissiveFactor.value);
        }
        if (materialNode.Opacity) {
            parameters.opacity = parseFloat(materialNode.Opacity.value);
        }
        if (parameters.opacity < 1) {
            parameters.transparent = true;
        }
        if (materialNode.ReflectionFactor) {
            parameters.reflectivity = materialNode.ReflectionFactor.value;
        }
        if (materialNode.Shininess) {
            parameters.shininess = materialNode.Shininess.value;
        }
        if (materialNode.Specular) {
            parameters.specular = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.Specular.value);
        } else if (materialNode.SpecularColor && materialNode.SpecularColor.type === "Color") {
            parameters.specular = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(materialNode.SpecularColor.value);
        }
        const scope = this;
        connections.get(ID).children.forEach(function(child) {
            const type = child.relationship;
            switch(type){
                case "Bump":
                    parameters.bumpMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "Maya|TEX_ao_map":
                    parameters.aoMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "DiffuseColor":
                case "Maya|TEX_color_map":
                    parameters.map = scope.getTexture(textureMap, child.ID);
                    if (parameters.map !== void 0) {
                        if ("colorSpace" in parameters.map) parameters.map.colorSpace = "srgb";
                        else parameters.map.encoding = 3001;
                    }
                    break;
                case "DisplacementColor":
                    parameters.displacementMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "EmissiveColor":
                    parameters.emissiveMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.emissiveMap !== void 0) {
                        if ("colorSpace" in parameters.emissiveMap) parameters.emissiveMap.colorSpace = "srgb";
                        else parameters.emissiveMap.encoding = 3001;
                    }
                    break;
                case "NormalMap":
                case "Maya|TEX_normal_map":
                    parameters.normalMap = scope.getTexture(textureMap, child.ID);
                    break;
                case "ReflectionColor":
                    parameters.envMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.envMap !== void 0) {
                        parameters.envMap.mapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquirectangularReflectionMapping"];
                        if ("colorSpace" in parameters.envMap) parameters.envMap.colorSpace = "srgb";
                        else parameters.envMap.encoding = 3001;
                    }
                    break;
                case "SpecularColor":
                    parameters.specularMap = scope.getTexture(textureMap, child.ID);
                    if (parameters.specularMap !== void 0) {
                        if ("colorSpace" in parameters.specularMap) parameters.specularMap.colorSpace = "srgb";
                        else parameters.specularMap.encoding = 3001;
                    }
                    break;
                case "TransparentColor":
                case "TransparencyFactor":
                    parameters.alphaMap = scope.getTexture(textureMap, child.ID);
                    parameters.transparent = true;
                    break;
                case "AmbientColor":
                case "ShininessExponent":
                case "SpecularFactor":
                case "VectorDisplacementColor":
                default:
                    console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.", type);
                    break;
            }
        });
        return parameters;
    }
    // get a texture from the textureMap for use by a material.
    getTexture(textureMap, id) {
        if ("LayeredTexture" in fbxTree.Objects && id in fbxTree.Objects.LayeredTexture) {
            console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.");
            id = connections.get(id).children[0].ID;
        }
        return textureMap.get(id);
    }
    // Parse nodes in FBXTree.Objects.Deformer
    // Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
    // Generates map of Skeleton-like objects for use later when generating and binding skeletons.
    parseDeformers() {
        const skeletons = {};
        const morphTargets = {};
        if ("Deformer" in fbxTree.Objects) {
            const DeformerNodes = fbxTree.Objects.Deformer;
            for(const nodeID in DeformerNodes){
                const deformerNode = DeformerNodes[nodeID];
                const relationships = connections.get(parseInt(nodeID));
                if (deformerNode.attrType === "Skin") {
                    const skeleton = this.parseSkeleton(relationships, DeformerNodes);
                    skeleton.ID = nodeID;
                    if (relationships.parents.length > 1) {
                        console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported.");
                    }
                    skeleton.geometryID = relationships.parents[0].ID;
                    skeletons[nodeID] = skeleton;
                } else if (deformerNode.attrType === "BlendShape") {
                    const morphTarget = {
                        id: nodeID
                    };
                    morphTarget.rawTargets = this.parseMorphTargets(relationships, DeformerNodes);
                    morphTarget.id = nodeID;
                    if (relationships.parents.length > 1) {
                        console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported.");
                    }
                    morphTargets[nodeID] = morphTarget;
                }
            }
        }
        return {
            skeletons,
            morphTargets
        };
    }
    // Parse single nodes in FBXTree.Objects.Deformer
    // The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
    // Each skin node represents a skeleton and each cluster node represents a bone
    parseSkeleton(relationships, deformerNodes) {
        const rawBones = [];
        relationships.children.forEach(function(child) {
            const boneNode = deformerNodes[child.ID];
            if (boneNode.attrType !== "Cluster") return;
            const rawBone = {
                ID: child.ID,
                indices: [],
                weights: [],
                transformLink: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(boneNode.TransformLink.a)
            };
            if ("Indexes" in boneNode) {
                rawBone.indices = boneNode.Indexes.a;
                rawBone.weights = boneNode.Weights.a;
            }
            rawBones.push(rawBone);
        });
        return {
            rawBones,
            bones: []
        };
    }
    // The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
    parseMorphTargets(relationships, deformerNodes) {
        const rawMorphTargets = [];
        for(let i = 0; i < relationships.children.length; i++){
            const child = relationships.children[i];
            const morphTargetNode = deformerNodes[child.ID];
            const rawMorphTarget = {
                name: morphTargetNode.attrName,
                initialWeight: morphTargetNode.DeformPercent,
                id: morphTargetNode.id,
                fullWeights: morphTargetNode.FullWeights.a
            };
            if (morphTargetNode.attrType !== "BlendShapeChannel") return;
            rawMorphTarget.geoID = connections.get(parseInt(child.ID)).children.filter(function(child2) {
                return child2.relationship === void 0;
            })[0].ID;
            rawMorphTargets.push(rawMorphTarget);
        }
        return rawMorphTargets;
    }
    // create the main Group() to be returned by the loader
    parseScene(deformers, geometryMap, materialMap) {
        sceneGraph = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        const modelMap = this.parseModels(deformers.skeletons, geometryMap, materialMap);
        const modelNodes = fbxTree.Objects.Model;
        const scope = this;
        modelMap.forEach(function(model) {
            const modelNode = modelNodes[model.ID];
            scope.setLookAtProperties(model, modelNode);
            const parentConnections = connections.get(model.ID).parents;
            parentConnections.forEach(function(connection) {
                const parent = modelMap.get(connection.ID);
                if (parent !== void 0) parent.add(model);
            });
            if (model.parent === null) {
                sceneGraph.add(model);
            }
        });
        this.bindSkeleton(deformers.skeletons, geometryMap, modelMap);
        this.createAmbientLight();
        sceneGraph.traverse(function(node) {
            if (node.userData.transformData) {
                if (node.parent) {
                    node.userData.transformData.parentMatrix = node.parent.matrix;
                    node.userData.transformData.parentMatrixWorld = node.parent.matrixWorld;
                }
                const transform = generateTransform(node.userData.transformData);
                node.applyMatrix4(transform);
                node.updateWorldMatrix();
            }
        });
        const animations = new AnimationParser().parse();
        if (sceneGraph.children.length === 1 && sceneGraph.children[0].isGroup) {
            sceneGraph.children[0].animations = animations;
            sceneGraph = sceneGraph.children[0];
        }
        sceneGraph.animations = animations;
    }
    // parse nodes in FBXTree.Objects.Model
    parseModels(skeletons, geometryMap, materialMap) {
        const modelMap = /* @__PURE__ */ new Map();
        const modelNodes = fbxTree.Objects.Model;
        for(const nodeID in modelNodes){
            const id = parseInt(nodeID);
            const node = modelNodes[nodeID];
            const relationships = connections.get(id);
            let model = this.buildSkeleton(relationships, skeletons, id, node.attrName);
            if (!model) {
                switch(node.attrType){
                    case "Camera":
                        model = this.createCamera(relationships);
                        break;
                    case "Light":
                        model = this.createLight(relationships);
                        break;
                    case "Mesh":
                        model = this.createMesh(relationships, geometryMap, materialMap);
                        break;
                    case "NurbsCurve":
                        model = this.createCurve(relationships, geometryMap);
                        break;
                    case "LimbNode":
                    case "Root":
                        model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"]();
                        break;
                    case "Null":
                    default:
                        model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                        break;
                }
                model.name = node.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(node.attrName) : "";
                model.ID = id;
            }
            this.getTransformData(model, node);
            modelMap.set(id, model);
        }
        return modelMap;
    }
    buildSkeleton(relationships, skeletons, id, name) {
        let bone = null;
        relationships.parents.forEach(function(parent) {
            for(const ID in skeletons){
                const skeleton = skeletons[ID];
                skeleton.rawBones.forEach(function(rawBone, i) {
                    if (rawBone.ID === parent.ID) {
                        const subBone = bone;
                        bone = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bone"]();
                        bone.matrixWorld.copy(rawBone.transformLink);
                        bone.name = name ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(name) : "";
                        bone.ID = id;
                        skeleton.bones[i] = bone;
                        if (subBone !== null) {
                            bone.add(subBone);
                        }
                    }
                });
            }
        });
        return bone;
    }
    // create a PerspectiveCamera or OrthographicCamera
    createCamera(relationships) {
        let model;
        let cameraAttribute;
        relationships.children.forEach(function(child) {
            const attr = fbxTree.Objects.NodeAttribute[child.ID];
            if (attr !== void 0) {
                cameraAttribute = attr;
            }
        });
        if (cameraAttribute === void 0) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
        } else {
            let type = 0;
            if (cameraAttribute.CameraProjectionType !== void 0 && cameraAttribute.CameraProjectionType.value === 1) {
                type = 1;
            }
            let nearClippingPlane = 1;
            if (cameraAttribute.NearPlane !== void 0) {
                nearClippingPlane = cameraAttribute.NearPlane.value / 1e3;
            }
            let farClippingPlane = 1e3;
            if (cameraAttribute.FarPlane !== void 0) {
                farClippingPlane = cameraAttribute.FarPlane.value / 1e3;
            }
            let width = window.innerWidth;
            let height = window.innerHeight;
            if (cameraAttribute.AspectWidth !== void 0 && cameraAttribute.AspectHeight !== void 0) {
                width = cameraAttribute.AspectWidth.value;
                height = cameraAttribute.AspectHeight.value;
            }
            const aspect = width / height;
            let fov = 45;
            if (cameraAttribute.FieldOfView !== void 0) {
                fov = cameraAttribute.FieldOfView.value;
            }
            const focalLength = cameraAttribute.FocalLength ? cameraAttribute.FocalLength.value : null;
            switch(type){
                case 0:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](fov, aspect, nearClippingPlane, farClippingPlane);
                    if (focalLength !== null) model.setFocalLength(focalLength);
                    break;
                case 1:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrthographicCamera"](-width / 2, width / 2, height / 2, -height / 2, nearClippingPlane, farClippingPlane);
                    break;
                default:
                    console.warn("THREE.FBXLoader: Unknown camera type " + type + ".");
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
                    break;
            }
        }
        return model;
    }
    // Create a DirectionalLight, PointLight or SpotLight
    createLight(relationships) {
        let model;
        let lightAttribute;
        relationships.children.forEach(function(child) {
            const attr = fbxTree.Objects.NodeAttribute[child.ID];
            if (attr !== void 0) {
                lightAttribute = attr;
            }
        });
        if (lightAttribute === void 0) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
        } else {
            let type;
            if (lightAttribute.LightType === void 0) {
                type = 0;
            } else {
                type = lightAttribute.LightType.value;
            }
            let color = 16777215;
            if (lightAttribute.Color !== void 0) {
                color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]().fromArray(lightAttribute.Color.value);
            }
            let intensity = lightAttribute.Intensity === void 0 ? 1 : lightAttribute.Intensity.value / 100;
            if (lightAttribute.CastLightOnObject !== void 0 && lightAttribute.CastLightOnObject.value === 0) {
                intensity = 0;
            }
            let distance = 0;
            if (lightAttribute.FarAttenuationEnd !== void 0) {
                if (lightAttribute.EnableFarAttenuation !== void 0 && lightAttribute.EnableFarAttenuation.value === 0) {
                    distance = 0;
                } else {
                    distance = lightAttribute.FarAttenuationEnd.value;
                }
            }
            const decay = 1;
            switch(type){
                case 0:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](color, intensity, distance, decay);
                    break;
                case 1:
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](color, intensity);
                    break;
                case 2:
                    let angle = Math.PI / 3;
                    if (lightAttribute.InnerAngle !== void 0) {
                        angle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(lightAttribute.InnerAngle.value);
                    }
                    let penumbra = 0;
                    if (lightAttribute.OuterAngle !== void 0) {
                        penumbra = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(lightAttribute.OuterAngle.value);
                        penumbra = Math.max(penumbra, 1);
                    }
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpotLight"](color, intensity, distance, angle, penumbra, decay);
                    break;
                default:
                    console.warn("THREE.FBXLoader: Unknown light type " + lightAttribute.LightType.value + ", defaulting to a PointLight.");
                    model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](color, intensity);
                    break;
            }
            if (lightAttribute.CastShadows !== void 0 && lightAttribute.CastShadows.value === 1) {
                model.castShadow = true;
            }
        }
        return model;
    }
    createMesh(relationships, geometryMap, materialMap) {
        let model;
        let geometry = null;
        let material = null;
        const materials = [];
        relationships.children.forEach(function(child) {
            if (geometryMap.has(child.ID)) {
                geometry = geometryMap.get(child.ID);
            }
            if (materialMap.has(child.ID)) {
                materials.push(materialMap.get(child.ID));
            }
        });
        if (materials.length > 1) {
            material = materials;
        } else if (materials.length > 0) {
            material = materials[0];
        } else {
            material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                color: 13421772
            });
            materials.push(material);
        }
        if ("color" in geometry.attributes) {
            materials.forEach(function(material2) {
                material2.vertexColors = true;
            });
        }
        if (geometry.FBX_Deformer) {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkinnedMesh"](geometry, material);
            model.normalizeSkinWeights();
        } else {
            model = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
        }
        return model;
    }
    createCurve(relationships, geometryMap) {
        const geometry = relationships.children.reduce(function(geo, child) {
            if (geometryMap.has(child.ID)) geo = geometryMap.get(child.ID);
            return geo;
        }, null);
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 3342591,
            linewidth: 1
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"](geometry, material);
    }
    // parse the model node for transform data
    getTransformData(model, modelNode) {
        const transformData = {};
        if ("InheritType" in modelNode) transformData.inheritType = parseInt(modelNode.InheritType.value);
        if ("RotationOrder" in modelNode) transformData.eulerOrder = getEulerOrder(modelNode.RotationOrder.value);
        else transformData.eulerOrder = "ZYX";
        if ("Lcl_Translation" in modelNode) transformData.translation = modelNode.Lcl_Translation.value;
        if ("PreRotation" in modelNode) transformData.preRotation = modelNode.PreRotation.value;
        if ("Lcl_Rotation" in modelNode) transformData.rotation = modelNode.Lcl_Rotation.value;
        if ("PostRotation" in modelNode) transformData.postRotation = modelNode.PostRotation.value;
        if ("Lcl_Scaling" in modelNode) transformData.scale = modelNode.Lcl_Scaling.value;
        if ("ScalingOffset" in modelNode) transformData.scalingOffset = modelNode.ScalingOffset.value;
        if ("ScalingPivot" in modelNode) transformData.scalingPivot = modelNode.ScalingPivot.value;
        if ("RotationOffset" in modelNode) transformData.rotationOffset = modelNode.RotationOffset.value;
        if ("RotationPivot" in modelNode) transformData.rotationPivot = modelNode.RotationPivot.value;
        model.userData.transformData = transformData;
    }
    setLookAtProperties(model, modelNode) {
        if ("LookAtProperty" in modelNode) {
            const children = connections.get(model.ID).children;
            children.forEach(function(child) {
                if (child.relationship === "LookAtProperty") {
                    const lookAtTarget = fbxTree.Objects.Model[child.ID];
                    if ("Lcl_Translation" in lookAtTarget) {
                        const pos = lookAtTarget.Lcl_Translation.value;
                        if (model.target !== void 0) {
                            model.target.position.fromArray(pos);
                            sceneGraph.add(model.target);
                        } else {
                            model.lookAt(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().fromArray(pos));
                        }
                    }
                }
            });
        }
    }
    bindSkeleton(skeletons, geometryMap, modelMap) {
        const bindMatrices = this.parsePoseNodes();
        for(const ID in skeletons){
            const skeleton = skeletons[ID];
            const parents = connections.get(parseInt(skeleton.ID)).parents;
            parents.forEach(function(parent) {
                if (geometryMap.has(parent.ID)) {
                    const geoID = parent.ID;
                    const geoRelationships = connections.get(geoID);
                    geoRelationships.parents.forEach(function(geoConnParent) {
                        if (modelMap.has(geoConnParent.ID)) {
                            const model = modelMap.get(geoConnParent.ID);
                            model.bind(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"](skeleton.bones), bindMatrices[geoConnParent.ID]);
                        }
                    });
                }
            });
        }
    }
    parsePoseNodes() {
        const bindMatrices = {};
        if ("Pose" in fbxTree.Objects) {
            const BindPoseNode = fbxTree.Objects.Pose;
            for(const nodeID in BindPoseNode){
                if (BindPoseNode[nodeID].attrType === "BindPose" && BindPoseNode[nodeID].NbPoseNodes > 0) {
                    const poseNodes = BindPoseNode[nodeID].PoseNode;
                    if (Array.isArray(poseNodes)) {
                        poseNodes.forEach(function(poseNode) {
                            bindMatrices[poseNode.Node] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(poseNode.Matrix.a);
                        });
                    } else {
                        bindMatrices[poseNodes.Node] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().fromArray(poseNodes.Matrix.a);
                    }
                }
            }
        }
        return bindMatrices;
    }
    // Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
    createAmbientLight() {
        if ("GlobalSettings" in fbxTree && "AmbientColor" in fbxTree.GlobalSettings) {
            const ambientColor = fbxTree.GlobalSettings.AmbientColor.value;
            const r = ambientColor[0];
            const g = ambientColor[1];
            const b = ambientColor[2];
            if (r !== 0 || g !== 0 || b !== 0) {
                const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](r, g, b);
                sceneGraph.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](color, 1));
            }
        }
    }
}
class GeometryParser {
    // Parse nodes in FBXTree.Objects.Geometry
    parse(deformers) {
        const geometryMap = /* @__PURE__ */ new Map();
        if ("Geometry" in fbxTree.Objects) {
            const geoNodes = fbxTree.Objects.Geometry;
            for(const nodeID in geoNodes){
                const relationships = connections.get(parseInt(nodeID));
                const geo = this.parseGeometry(relationships, geoNodes[nodeID], deformers);
                geometryMap.set(parseInt(nodeID), geo);
            }
        }
        return geometryMap;
    }
    // Parse single node in FBXTree.Objects.Geometry
    parseGeometry(relationships, geoNode, deformers) {
        switch(geoNode.attrType){
            case "Mesh":
                return this.parseMeshGeometry(relationships, geoNode, deformers);
            case "NurbsCurve":
                return this.parseNurbsGeometry(geoNode);
        }
    }
    // Parse single node mesh geometry in FBXTree.Objects.Geometry
    parseMeshGeometry(relationships, geoNode, deformers) {
        const skeletons = deformers.skeletons;
        const morphTargets = [];
        const modelNodes = relationships.parents.map(function(parent) {
            return fbxTree.Objects.Model[parent.ID];
        });
        if (modelNodes.length === 0) return;
        const skeleton = relationships.children.reduce(function(skeleton2, child) {
            if (skeletons[child.ID] !== void 0) skeleton2 = skeletons[child.ID];
            return skeleton2;
        }, null);
        relationships.children.forEach(function(child) {
            if (deformers.morphTargets[child.ID] !== void 0) {
                morphTargets.push(deformers.morphTargets[child.ID]);
            }
        });
        const modelNode = modelNodes[0];
        const transformData = {};
        if ("RotationOrder" in modelNode) transformData.eulerOrder = getEulerOrder(modelNode.RotationOrder.value);
        if ("InheritType" in modelNode) transformData.inheritType = parseInt(modelNode.InheritType.value);
        if ("GeometricTranslation" in modelNode) transformData.translation = modelNode.GeometricTranslation.value;
        if ("GeometricRotation" in modelNode) transformData.rotation = modelNode.GeometricRotation.value;
        if ("GeometricScaling" in modelNode) transformData.scale = modelNode.GeometricScaling.value;
        const transform = generateTransform(transformData);
        return this.genGeometry(geoNode, skeleton, morphTargets, transform);
    }
    // Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
    genGeometry(geoNode, skeleton, morphTargets, preTransform) {
        const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        if (geoNode.attrName) geo.name = geoNode.attrName;
        const geoInfo = this.parseGeoNode(geoNode, skeleton);
        const buffers = this.genBuffers(geoInfo);
        const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.vertex, 3);
        positionAttribute.applyMatrix4(preTransform);
        geo.setAttribute("position", positionAttribute);
        if (buffers.colors.length > 0) {
            geo.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.colors, 3));
        }
        if (skeleton) {
            geo.setAttribute("skinIndex", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uint16BufferAttribute"](buffers.weightsIndices, 4));
            geo.setAttribute("skinWeight", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.vertexWeights, 4));
            geo.FBX_Deformer = skeleton;
        }
        if (buffers.normal.length > 0) {
            const normalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]().getNormalMatrix(preTransform);
            const normalAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.normal, 3);
            normalAttribute.applyNormalMatrix(normalMatrix);
            geo.setAttribute("normal", normalAttribute);
        }
        buffers.uvs.forEach(function(uvBuffer, i) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$uv1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UV1"] === "uv2") i++;
            const name = i === 0 ? "uv" : `uv${i}`;
            geo.setAttribute(name, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](buffers.uvs[i], 2));
        });
        if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
            let prevMaterialIndex = buffers.materialIndex[0];
            let startIndex = 0;
            buffers.materialIndex.forEach(function(currentIndex, i) {
                if (currentIndex !== prevMaterialIndex) {
                    geo.addGroup(startIndex, i - startIndex, prevMaterialIndex);
                    prevMaterialIndex = currentIndex;
                    startIndex = i;
                }
            });
            if (geo.groups.length > 0) {
                const lastGroup = geo.groups[geo.groups.length - 1];
                const lastIndex = lastGroup.start + lastGroup.count;
                if (lastIndex !== buffers.materialIndex.length) {
                    geo.addGroup(lastIndex, buffers.materialIndex.length - lastIndex, prevMaterialIndex);
                }
            }
            if (geo.groups.length === 0) {
                geo.addGroup(0, buffers.materialIndex.length, buffers.materialIndex[0]);
            }
        }
        this.addMorphTargets(geo, geoNode, morphTargets, preTransform);
        return geo;
    }
    parseGeoNode(geoNode, skeleton) {
        const geoInfo = {};
        geoInfo.vertexPositions = geoNode.Vertices !== void 0 ? geoNode.Vertices.a : [];
        geoInfo.vertexIndices = geoNode.PolygonVertexIndex !== void 0 ? geoNode.PolygonVertexIndex.a : [];
        if (geoNode.LayerElementColor) {
            geoInfo.color = this.parseVertexColors(geoNode.LayerElementColor[0]);
        }
        if (geoNode.LayerElementMaterial) {
            geoInfo.material = this.parseMaterialIndices(geoNode.LayerElementMaterial[0]);
        }
        if (geoNode.LayerElementNormal) {
            geoInfo.normal = this.parseNormals(geoNode.LayerElementNormal[0]);
        }
        if (geoNode.LayerElementUV) {
            geoInfo.uv = [];
            let i = 0;
            while(geoNode.LayerElementUV[i]){
                if (geoNode.LayerElementUV[i].UV) {
                    geoInfo.uv.push(this.parseUVs(geoNode.LayerElementUV[i]));
                }
                i++;
            }
        }
        geoInfo.weightTable = {};
        if (skeleton !== null) {
            geoInfo.skeleton = skeleton;
            skeleton.rawBones.forEach(function(rawBone, i) {
                rawBone.indices.forEach(function(index, j) {
                    if (geoInfo.weightTable[index] === void 0) geoInfo.weightTable[index] = [];
                    geoInfo.weightTable[index].push({
                        id: i,
                        weight: rawBone.weights[j]
                    });
                });
            });
        }
        return geoInfo;
    }
    genBuffers(geoInfo) {
        const buffers = {
            vertex: [],
            normal: [],
            colors: [],
            uvs: [],
            materialIndex: [],
            vertexWeights: [],
            weightsIndices: []
        };
        let polygonIndex = 0;
        let faceLength = 0;
        let displayedWeightsWarning = false;
        let facePositionIndexes = [];
        let faceNormals = [];
        let faceColors = [];
        let faceUVs = [];
        let faceWeights = [];
        let faceWeightIndices = [];
        const scope = this;
        geoInfo.vertexIndices.forEach(function(vertexIndex, polygonVertexIndex) {
            let materialIndex;
            let endOfFace = false;
            if (vertexIndex < 0) {
                vertexIndex = vertexIndex ^ -1;
                endOfFace = true;
            }
            let weightIndices = [];
            let weights = [];
            facePositionIndexes.push(vertexIndex * 3, vertexIndex * 3 + 1, vertexIndex * 3 + 2);
            if (geoInfo.color) {
                const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.color);
                faceColors.push(data[0], data[1], data[2]);
            }
            if (geoInfo.skeleton) {
                if (geoInfo.weightTable[vertexIndex] !== void 0) {
                    geoInfo.weightTable[vertexIndex].forEach(function(wt) {
                        weights.push(wt.weight);
                        weightIndices.push(wt.id);
                    });
                }
                if (weights.length > 4) {
                    if (!displayedWeightsWarning) {
                        console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.");
                        displayedWeightsWarning = true;
                    }
                    const wIndex = [
                        0,
                        0,
                        0,
                        0
                    ];
                    const Weight = [
                        0,
                        0,
                        0,
                        0
                    ];
                    weights.forEach(function(weight, weightIndex) {
                        let currentWeight = weight;
                        let currentIndex = weightIndices[weightIndex];
                        Weight.forEach(function(comparedWeight, comparedWeightIndex, comparedWeightArray) {
                            if (currentWeight > comparedWeight) {
                                comparedWeightArray[comparedWeightIndex] = currentWeight;
                                currentWeight = comparedWeight;
                                const tmp = wIndex[comparedWeightIndex];
                                wIndex[comparedWeightIndex] = currentIndex;
                                currentIndex = tmp;
                            }
                        });
                    });
                    weightIndices = wIndex;
                    weights = Weight;
                }
                while(weights.length < 4){
                    weights.push(0);
                    weightIndices.push(0);
                }
                for(let i = 0; i < 4; ++i){
                    faceWeights.push(weights[i]);
                    faceWeightIndices.push(weightIndices[i]);
                }
            }
            if (geoInfo.normal) {
                const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.normal);
                faceNormals.push(data[0], data[1], data[2]);
            }
            if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
                materialIndex = getData(polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.material)[0];
            }
            if (geoInfo.uv) {
                geoInfo.uv.forEach(function(uv, i) {
                    const data = getData(polygonVertexIndex, polygonIndex, vertexIndex, uv);
                    if (faceUVs[i] === void 0) {
                        faceUVs[i] = [];
                    }
                    faceUVs[i].push(data[0]);
                    faceUVs[i].push(data[1]);
                });
            }
            faceLength++;
            if (endOfFace) {
                scope.genFace(buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength);
                polygonIndex++;
                faceLength = 0;
                facePositionIndexes = [];
                faceNormals = [];
                faceColors = [];
                faceUVs = [];
                faceWeights = [];
                faceWeightIndices = [];
            }
        });
        return buffers;
    }
    // Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
    genFace(buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength) {
        for(let i = 2; i < faceLength; i++){
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[0]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[2]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3 + 1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[(i - 1) * 3 + 2]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3 + 1]]);
            buffers.vertex.push(geoInfo.vertexPositions[facePositionIndexes[i * 3 + 2]]);
            if (geoInfo.skeleton) {
                buffers.vertexWeights.push(faceWeights[0]);
                buffers.vertexWeights.push(faceWeights[1]);
                buffers.vertexWeights.push(faceWeights[2]);
                buffers.vertexWeights.push(faceWeights[3]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 1]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 2]);
                buffers.vertexWeights.push(faceWeights[(i - 1) * 4 + 3]);
                buffers.vertexWeights.push(faceWeights[i * 4]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 1]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 2]);
                buffers.vertexWeights.push(faceWeights[i * 4 + 3]);
                buffers.weightsIndices.push(faceWeightIndices[0]);
                buffers.weightsIndices.push(faceWeightIndices[1]);
                buffers.weightsIndices.push(faceWeightIndices[2]);
                buffers.weightsIndices.push(faceWeightIndices[3]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 1]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 2]);
                buffers.weightsIndices.push(faceWeightIndices[(i - 1) * 4 + 3]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 1]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 2]);
                buffers.weightsIndices.push(faceWeightIndices[i * 4 + 3]);
            }
            if (geoInfo.color) {
                buffers.colors.push(faceColors[0]);
                buffers.colors.push(faceColors[1]);
                buffers.colors.push(faceColors[2]);
                buffers.colors.push(faceColors[(i - 1) * 3]);
                buffers.colors.push(faceColors[(i - 1) * 3 + 1]);
                buffers.colors.push(faceColors[(i - 1) * 3 + 2]);
                buffers.colors.push(faceColors[i * 3]);
                buffers.colors.push(faceColors[i * 3 + 1]);
                buffers.colors.push(faceColors[i * 3 + 2]);
            }
            if (geoInfo.material && geoInfo.material.mappingType !== "AllSame") {
                buffers.materialIndex.push(materialIndex);
                buffers.materialIndex.push(materialIndex);
                buffers.materialIndex.push(materialIndex);
            }
            if (geoInfo.normal) {
                buffers.normal.push(faceNormals[0]);
                buffers.normal.push(faceNormals[1]);
                buffers.normal.push(faceNormals[2]);
                buffers.normal.push(faceNormals[(i - 1) * 3]);
                buffers.normal.push(faceNormals[(i - 1) * 3 + 1]);
                buffers.normal.push(faceNormals[(i - 1) * 3 + 2]);
                buffers.normal.push(faceNormals[i * 3]);
                buffers.normal.push(faceNormals[i * 3 + 1]);
                buffers.normal.push(faceNormals[i * 3 + 2]);
            }
            if (geoInfo.uv) {
                geoInfo.uv.forEach(function(uv, j) {
                    if (buffers.uvs[j] === void 0) buffers.uvs[j] = [];
                    buffers.uvs[j].push(faceUVs[j][0]);
                    buffers.uvs[j].push(faceUVs[j][1]);
                    buffers.uvs[j].push(faceUVs[j][(i - 1) * 2]);
                    buffers.uvs[j].push(faceUVs[j][(i - 1) * 2 + 1]);
                    buffers.uvs[j].push(faceUVs[j][i * 2]);
                    buffers.uvs[j].push(faceUVs[j][i * 2 + 1]);
                });
            }
        }
    }
    addMorphTargets(parentGeo, parentGeoNode, morphTargets, preTransform) {
        if (morphTargets.length === 0) return;
        parentGeo.morphTargetsRelative = true;
        parentGeo.morphAttributes.position = [];
        const scope = this;
        morphTargets.forEach(function(morphTarget) {
            morphTarget.rawTargets.forEach(function(rawTarget) {
                const morphGeoNode = fbxTree.Objects.Geometry[rawTarget.geoID];
                if (morphGeoNode !== void 0) {
                    scope.genMorphGeometry(parentGeo, parentGeoNode, morphGeoNode, preTransform, rawTarget.name);
                }
            });
        });
    }
    // a morph geometry node is similar to a standard  node, and the node is also contained
    // in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
    // and a special attribute Index defining which vertices of the original geometry are affected
    // Normal and position attributes only have data for the vertices that are affected by the morph
    genMorphGeometry(parentGeo, parentGeoNode, morphGeoNode, preTransform, name) {
        const vertexIndices = parentGeoNode.PolygonVertexIndex !== void 0 ? parentGeoNode.PolygonVertexIndex.a : [];
        const morphPositionsSparse = morphGeoNode.Vertices !== void 0 ? morphGeoNode.Vertices.a : [];
        const indices = morphGeoNode.Indexes !== void 0 ? morphGeoNode.Indexes.a : [];
        const length = parentGeo.attributes.position.count * 3;
        const morphPositions = new Float32Array(length);
        for(let i = 0; i < indices.length; i++){
            const morphIndex = indices[i] * 3;
            morphPositions[morphIndex] = morphPositionsSparse[i * 3];
            morphPositions[morphIndex + 1] = morphPositionsSparse[i * 3 + 1];
            morphPositions[morphIndex + 2] = morphPositionsSparse[i * 3 + 2];
        }
        const morphGeoInfo = {
            vertexIndices,
            vertexPositions: morphPositions
        };
        const morphBuffers = this.genBuffers(morphGeoInfo);
        const positionAttribute = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](morphBuffers.vertex, 3);
        positionAttribute.name = name || morphGeoNode.attrName;
        positionAttribute.applyMatrix4(preTransform);
        parentGeo.morphAttributes.position.push(positionAttribute);
    }
    // Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
    parseNormals(NormalNode) {
        const mappingType = NormalNode.MappingInformationType;
        const referenceType = NormalNode.ReferenceInformationType;
        const buffer = NormalNode.Normals.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            if ("NormalIndex" in NormalNode) {
                indexBuffer = NormalNode.NormalIndex.a;
            } else if ("NormalsIndex" in NormalNode) {
                indexBuffer = NormalNode.NormalsIndex.a;
            }
        }
        return {
            dataSize: 3,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
    parseUVs(UVNode) {
        const mappingType = UVNode.MappingInformationType;
        const referenceType = UVNode.ReferenceInformationType;
        const buffer = UVNode.UV.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            indexBuffer = UVNode.UVIndex.a;
        }
        return {
            dataSize: 2,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
    parseVertexColors(ColorNode) {
        const mappingType = ColorNode.MappingInformationType;
        const referenceType = ColorNode.ReferenceInformationType;
        const buffer = ColorNode.Colors.a;
        let indexBuffer = [];
        if (referenceType === "IndexToDirect") {
            indexBuffer = ColorNode.ColorIndex.a;
        }
        return {
            dataSize: 4,
            buffer,
            indices: indexBuffer,
            mappingType,
            referenceType
        };
    }
    // Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
    parseMaterialIndices(MaterialNode) {
        const mappingType = MaterialNode.MappingInformationType;
        const referenceType = MaterialNode.ReferenceInformationType;
        if (mappingType === "NoMappingInformation") {
            return {
                dataSize: 1,
                buffer: [
                    0
                ],
                indices: [
                    0
                ],
                mappingType: "AllSame",
                referenceType
            };
        }
        const materialIndexBuffer = MaterialNode.Materials.a;
        const materialIndices = [];
        for(let i = 0; i < materialIndexBuffer.length; ++i){
            materialIndices.push(i);
        }
        return {
            dataSize: 1,
            buffer: materialIndexBuffer,
            indices: materialIndices,
            mappingType,
            referenceType
        };
    }
    // Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
    parseNurbsGeometry(geoNode) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NURBSCurve"] === void 0) {
            console.error("THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.");
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        }
        const order = parseInt(geoNode.Order);
        if (isNaN(order)) {
            console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", geoNode.Order, geoNode.id);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        }
        const degree = order - 1;
        const knots = geoNode.KnotVector.a;
        const controlPoints = [];
        const pointsValues = geoNode.Points.a;
        for(let i = 0, l = pointsValues.length; i < l; i += 4){
            controlPoints.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"]().fromArray(pointsValues, i));
        }
        let startKnot, endKnot;
        if (geoNode.Form === "Closed") {
            controlPoints.push(controlPoints[0]);
        } else if (geoNode.Form === "Periodic") {
            startKnot = degree;
            endKnot = knots.length - 1 - startKnot;
            for(let i = 0; i < degree; ++i){
                controlPoints.push(controlPoints[i]);
            }
        }
        const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$curves$2f$NURBSCurve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NURBSCurve"](degree, knots, controlPoints, startKnot, endKnot);
        const points = curve.getPoints(controlPoints.length * 12);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
    }
}
class AnimationParser {
    // take raw animation clips and turn them into three.js animation clips
    parse() {
        const animationClips = [];
        const rawClips = this.parseClips();
        if (rawClips !== void 0) {
            for(const key in rawClips){
                const rawClip = rawClips[key];
                const clip = this.addClip(rawClip);
                animationClips.push(clip);
            }
        }
        return animationClips;
    }
    parseClips() {
        if (fbxTree.Objects.AnimationCurve === void 0) return void 0;
        const curveNodesMap = this.parseAnimationCurveNodes();
        this.parseAnimationCurves(curveNodesMap);
        const layersMap = this.parseAnimationLayers(curveNodesMap);
        const rawClips = this.parseAnimStacks(layersMap);
        return rawClips;
    }
    // parse nodes in FBXTree.Objects.AnimationCurveNode
    // each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
    // and is referenced by an AnimationLayer
    parseAnimationCurveNodes() {
        const rawCurveNodes = fbxTree.Objects.AnimationCurveNode;
        const curveNodesMap = /* @__PURE__ */ new Map();
        for(const nodeID in rawCurveNodes){
            const rawCurveNode = rawCurveNodes[nodeID];
            if (rawCurveNode.attrName.match(/S|R|T|DeformPercent/) !== null) {
                const curveNode = {
                    id: rawCurveNode.id,
                    attr: rawCurveNode.attrName,
                    curves: {}
                };
                curveNodesMap.set(curveNode.id, curveNode);
            }
        }
        return curveNodesMap;
    }
    // parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
    // previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
    // axis ( e.g. times and values of x rotation)
    parseAnimationCurves(curveNodesMap) {
        const rawCurves = fbxTree.Objects.AnimationCurve;
        for(const nodeID in rawCurves){
            const animationCurve = {
                id: rawCurves[nodeID].id,
                times: rawCurves[nodeID].KeyTime.a.map(convertFBXTimeToSeconds),
                values: rawCurves[nodeID].KeyValueFloat.a
            };
            const relationships = connections.get(animationCurve.id);
            if (relationships !== void 0) {
                const animationCurveID = relationships.parents[0].ID;
                const animationCurveRelationship = relationships.parents[0].relationship;
                if (animationCurveRelationship.match(/X/)) {
                    curveNodesMap.get(animationCurveID).curves["x"] = animationCurve;
                } else if (animationCurveRelationship.match(/Y/)) {
                    curveNodesMap.get(animationCurveID).curves["y"] = animationCurve;
                } else if (animationCurveRelationship.match(/Z/)) {
                    curveNodesMap.get(animationCurveID).curves["z"] = animationCurve;
                } else if (animationCurveRelationship.match(/d|DeformPercent/) && curveNodesMap.has(animationCurveID)) {
                    curveNodesMap.get(animationCurveID).curves["morph"] = animationCurve;
                }
            }
        }
    }
    // parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
    // to various AnimationCurveNodes and is referenced by an AnimationStack node
    // note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
    parseAnimationLayers(curveNodesMap) {
        const rawLayers = fbxTree.Objects.AnimationLayer;
        const layersMap = /* @__PURE__ */ new Map();
        for(const nodeID in rawLayers){
            const layerCurveNodes = [];
            const connection = connections.get(parseInt(nodeID));
            if (connection !== void 0) {
                const children = connection.children;
                children.forEach(function(child, i) {
                    if (curveNodesMap.has(child.ID)) {
                        const curveNode = curveNodesMap.get(child.ID);
                        if (curveNode.curves.x !== void 0 || curveNode.curves.y !== void 0 || curveNode.curves.z !== void 0) {
                            if (layerCurveNodes[i] === void 0) {
                                const modelID = connections.get(child.ID).parents.filter(function(parent) {
                                    return parent.relationship !== void 0;
                                })[0].ID;
                                if (modelID !== void 0) {
                                    const rawModel = fbxTree.Objects.Model[modelID.toString()];
                                    if (rawModel === void 0) {
                                        console.warn("THREE.FBXLoader: Encountered a unused curve.", child);
                                        return;
                                    }
                                    const node = {
                                        modelName: rawModel.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(rawModel.attrName) : "",
                                        ID: rawModel.id,
                                        initialPosition: [
                                            0,
                                            0,
                                            0
                                        ],
                                        initialRotation: [
                                            0,
                                            0,
                                            0
                                        ],
                                        initialScale: [
                                            1,
                                            1,
                                            1
                                        ]
                                    };
                                    sceneGraph.traverse(function(child2) {
                                        if (child2.ID === rawModel.id) {
                                            node.transform = child2.matrix;
                                            if (child2.userData.transformData) node.eulerOrder = child2.userData.transformData.eulerOrder;
                                        }
                                    });
                                    if (!node.transform) node.transform = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
                                    if ("PreRotation" in rawModel) node.preRotation = rawModel.PreRotation.value;
                                    if ("PostRotation" in rawModel) node.postRotation = rawModel.PostRotation.value;
                                    layerCurveNodes[i] = node;
                                }
                            }
                            if (layerCurveNodes[i]) layerCurveNodes[i][curveNode.attr] = curveNode;
                        } else if (curveNode.curves.morph !== void 0) {
                            if (layerCurveNodes[i] === void 0) {
                                const deformerID = connections.get(child.ID).parents.filter(function(parent) {
                                    return parent.relationship !== void 0;
                                })[0].ID;
                                const morpherID = connections.get(deformerID).parents[0].ID;
                                const geoID = connections.get(morpherID).parents[0].ID;
                                const modelID = connections.get(geoID).parents[0].ID;
                                const rawModel = fbxTree.Objects.Model[modelID];
                                const node = {
                                    modelName: rawModel.attrName ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyBinding"].sanitizeNodeName(rawModel.attrName) : "",
                                    morphName: fbxTree.Objects.Deformer[deformerID].attrName
                                };
                                layerCurveNodes[i] = node;
                            }
                            layerCurveNodes[i][curveNode.attr] = curveNode;
                        }
                    }
                });
                layersMap.set(parseInt(nodeID), layerCurveNodes);
            }
        }
        return layersMap;
    }
    // parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
    // hierarchy. Each Stack node will be used to create a AnimationClip
    parseAnimStacks(layersMap) {
        const rawStacks = fbxTree.Objects.AnimationStack;
        const rawClips = {};
        for(const nodeID in rawStacks){
            const children = connections.get(parseInt(nodeID)).children;
            if (children.length > 1) {
                console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
            }
            const layer = layersMap.get(children[0].ID);
            rawClips[nodeID] = {
                name: rawStacks[nodeID].attrName,
                layer
            };
        }
        return rawClips;
    }
    addClip(rawClip) {
        let tracks = [];
        const scope = this;
        rawClip.layer.forEach(function(rawTracks) {
            tracks = tracks.concat(scope.generateTracks(rawTracks));
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationClip"](rawClip.name, -1, tracks);
    }
    generateTracks(rawTracks) {
        const tracks = [];
        let initialPosition = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        let initialRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
        let initialScale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
        if (rawTracks.transform) rawTracks.transform.decompose(initialPosition, initialRotation, initialScale);
        initialPosition = initialPosition.toArray();
        initialRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]().setFromQuaternion(initialRotation, rawTracks.eulerOrder).toArray();
        initialScale = initialScale.toArray();
        if (rawTracks.T !== void 0 && Object.keys(rawTracks.T.curves).length > 0) {
            const positionTrack = this.generateVectorTrack(rawTracks.modelName, rawTracks.T.curves, initialPosition, "position");
            if (positionTrack !== void 0) tracks.push(positionTrack);
        }
        if (rawTracks.R !== void 0 && Object.keys(rawTracks.R.curves).length > 0) {
            const rotationTrack = this.generateRotationTrack(rawTracks.modelName, rawTracks.R.curves, initialRotation, rawTracks.preRotation, rawTracks.postRotation, rawTracks.eulerOrder);
            if (rotationTrack !== void 0) tracks.push(rotationTrack);
        }
        if (rawTracks.S !== void 0 && Object.keys(rawTracks.S.curves).length > 0) {
            const scaleTrack = this.generateVectorTrack(rawTracks.modelName, rawTracks.S.curves, initialScale, "scale");
            if (scaleTrack !== void 0) tracks.push(scaleTrack);
        }
        if (rawTracks.DeformPercent !== void 0) {
            const morphTrack = this.generateMorphTrack(rawTracks);
            if (morphTrack !== void 0) tracks.push(morphTrack);
        }
        return tracks;
    }
    generateVectorTrack(modelName, curves, initialValue, type) {
        const times = this.getTimesForAllAxes(curves);
        const values = this.getKeyframeTrackValues(times, curves, initialValue);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VectorKeyframeTrack"](modelName + "." + type, times, values);
    }
    generateRotationTrack(modelName, curves, initialValue, preRotation, postRotation, eulerOrder) {
        if (curves.x !== void 0) {
            this.interpolateRotations(curves.x);
            curves.x.values = curves.x.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        if (curves.y !== void 0) {
            this.interpolateRotations(curves.y);
            curves.y.values = curves.y.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        if (curves.z !== void 0) {
            this.interpolateRotations(curves.z);
            curves.z.values = curves.z.values.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        }
        const times = this.getTimesForAllAxes(curves);
        const values = this.getKeyframeTrackValues(times, curves, initialValue);
        if (preRotation !== void 0) {
            preRotation = preRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
            preRotation.push(eulerOrder);
            preRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]().fromArray(preRotation);
            preRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(preRotation);
        }
        if (postRotation !== void 0) {
            postRotation = postRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
            postRotation.push(eulerOrder);
            postRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]().fromArray(postRotation);
            postRotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromEuler(postRotation).invert();
        }
        const quaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
        const euler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]();
        const quaternionValues = [];
        for(let i = 0; i < values.length; i += 3){
            euler.set(values[i], values[i + 1], values[i + 2], eulerOrder);
            quaternion.setFromEuler(euler);
            if (preRotation !== void 0) quaternion.premultiply(preRotation);
            if (postRotation !== void 0) quaternion.multiply(postRotation);
            quaternion.toArray(quaternionValues, i / 3 * 4);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuaternionKeyframeTrack"](modelName + ".quaternion", times, quaternionValues);
    }
    generateMorphTrack(rawTracks) {
        const curves = rawTracks.DeformPercent.curves.morph;
        const values = curves.values.map(function(val) {
            return val / 100;
        });
        const morphNum = sceneGraph.getObjectByName(rawTracks.modelName).morphTargetDictionary[rawTracks.morphName];
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberKeyframeTrack"](rawTracks.modelName + ".morphTargetInfluences[" + morphNum + "]", curves.times, values);
    }
    // For all animated objects, times are defined separately for each axis
    // Here we'll combine the times into one sorted array without duplicates
    getTimesForAllAxes(curves) {
        let times = [];
        if (curves.x !== void 0) times = times.concat(curves.x.times);
        if (curves.y !== void 0) times = times.concat(curves.y.times);
        if (curves.z !== void 0) times = times.concat(curves.z.times);
        times = times.sort(function(a, b) {
            return a - b;
        });
        if (times.length > 1) {
            let targetIndex = 1;
            let lastValue = times[0];
            for(let i = 1; i < times.length; i++){
                const currentValue = times[i];
                if (currentValue !== lastValue) {
                    times[targetIndex] = currentValue;
                    lastValue = currentValue;
                    targetIndex++;
                }
            }
            times = times.slice(0, targetIndex);
        }
        return times;
    }
    getKeyframeTrackValues(times, curves, initialValue) {
        const prevValue = initialValue;
        const values = [];
        let xIndex = -1;
        let yIndex = -1;
        let zIndex = -1;
        times.forEach(function(time) {
            if (curves.x) xIndex = curves.x.times.indexOf(time);
            if (curves.y) yIndex = curves.y.times.indexOf(time);
            if (curves.z) zIndex = curves.z.times.indexOf(time);
            if (xIndex !== -1) {
                const xValue = curves.x.values[xIndex];
                values.push(xValue);
                prevValue[0] = xValue;
            } else {
                values.push(prevValue[0]);
            }
            if (yIndex !== -1) {
                const yValue = curves.y.values[yIndex];
                values.push(yValue);
                prevValue[1] = yValue;
            } else {
                values.push(prevValue[1]);
            }
            if (zIndex !== -1) {
                const zValue = curves.z.values[zIndex];
                values.push(zValue);
                prevValue[2] = zValue;
            } else {
                values.push(prevValue[2]);
            }
        });
        return values;
    }
    // Rotations are defined as Euler angles which can have values  of any size
    // These will be converted to quaternions which don't support values greater than
    // PI, so we'll interpolate large rotations
    interpolateRotations(curve) {
        for(let i = 1; i < curve.values.length; i++){
            const initialValue = curve.values[i - 1];
            const valuesSpan = curve.values[i] - initialValue;
            const absoluteSpan = Math.abs(valuesSpan);
            if (absoluteSpan >= 180) {
                const numSubIntervals = absoluteSpan / 180;
                const step = valuesSpan / numSubIntervals;
                let nextValue = initialValue + step;
                const initialTime = curve.times[i - 1];
                const timeSpan = curve.times[i] - initialTime;
                const interval = timeSpan / numSubIntervals;
                let nextTime = initialTime + interval;
                const interpolatedTimes = [];
                const interpolatedValues = [];
                while(nextTime < curve.times[i]){
                    interpolatedTimes.push(nextTime);
                    nextTime += interval;
                    interpolatedValues.push(nextValue);
                    nextValue += step;
                }
                curve.times = inject(curve.times, i, interpolatedTimes);
                curve.values = inject(curve.values, i, interpolatedValues);
            }
        }
    }
}
class TextParser {
    getPrevNode() {
        return this.nodeStack[this.currentIndent - 2];
    }
    getCurrentNode() {
        return this.nodeStack[this.currentIndent - 1];
    }
    getCurrentProp() {
        return this.currentProp;
    }
    pushStack(node) {
        this.nodeStack.push(node);
        this.currentIndent += 1;
    }
    popStack() {
        this.nodeStack.pop();
        this.currentIndent -= 1;
    }
    setCurrentProp(val, name) {
        this.currentProp = val;
        this.currentPropName = name;
    }
    parse(text) {
        this.currentIndent = 0;
        this.allNodes = new FBXTree();
        this.nodeStack = [];
        this.currentProp = [];
        this.currentPropName = "";
        const scope = this;
        const split = text.split(/[\r\n]+/);
        split.forEach(function(line, i) {
            const matchComment = line.match(/^[\s\t]*;/);
            const matchEmpty = line.match(/^[\s\t]*$/);
            if (matchComment || matchEmpty) return;
            const matchBeginning = line.match("^\\t{" + scope.currentIndent + "}(\\w+):(.*){", "");
            const matchProperty = line.match("^\\t{" + scope.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)");
            const matchEnd = line.match("^\\t{" + (scope.currentIndent - 1) + "}}");
            if (matchBeginning) {
                scope.parseNodeBegin(line, matchBeginning);
            } else if (matchProperty) {
                scope.parseNodeProperty(line, matchProperty, split[++i]);
            } else if (matchEnd) {
                scope.popStack();
            } else if (line.match(/^[^\s\t}]/)) {
                scope.parseNodePropertyContinued(line);
            }
        });
        return this.allNodes;
    }
    parseNodeBegin(line, property) {
        const nodeName = property[1].trim().replace(/^"/, "").replace(/"$/, "");
        const nodeAttrs = property[2].split(",").map(function(attr) {
            return attr.trim().replace(/^"/, "").replace(/"$/, "");
        });
        const node = {
            name: nodeName
        };
        const attrs = this.parseNodeAttr(nodeAttrs);
        const currentNode = this.getCurrentNode();
        if (this.currentIndent === 0) {
            this.allNodes.add(nodeName, node);
        } else {
            if (nodeName in currentNode) {
                if (nodeName === "PoseNode") {
                    currentNode.PoseNode.push(node);
                } else if (currentNode[nodeName].id !== void 0) {
                    currentNode[nodeName] = {};
                    currentNode[nodeName][currentNode[nodeName].id] = currentNode[nodeName];
                }
                if (attrs.id !== "") currentNode[nodeName][attrs.id] = node;
            } else if (typeof attrs.id === "number") {
                currentNode[nodeName] = {};
                currentNode[nodeName][attrs.id] = node;
            } else if (nodeName !== "Properties70") {
                if (nodeName === "PoseNode") currentNode[nodeName] = [
                    node
                ];
                else currentNode[nodeName] = node;
            }
        }
        if (typeof attrs.id === "number") node.id = attrs.id;
        if (attrs.name !== "") node.attrName = attrs.name;
        if (attrs.type !== "") node.attrType = attrs.type;
        this.pushStack(node);
    }
    parseNodeAttr(attrs) {
        let id = attrs[0];
        if (attrs[0] !== "") {
            id = parseInt(attrs[0]);
            if (isNaN(id)) {
                id = attrs[0];
            }
        }
        let name = "", type = "";
        if (attrs.length > 1) {
            name = attrs[1].replace(/^(\w+)::/, "");
            type = attrs[2];
        }
        return {
            id,
            name,
            type
        };
    }
    parseNodeProperty(line, property, contentLine) {
        let propName = property[1].replace(/^"/, "").replace(/"$/, "").trim();
        let propValue = property[2].replace(/^"/, "").replace(/"$/, "").trim();
        if (propName === "Content" && propValue === ",") {
            propValue = contentLine.replace(/"/g, "").replace(/,$/, "").trim();
        }
        const currentNode = this.getCurrentNode();
        const parentName = currentNode.name;
        if (parentName === "Properties70") {
            this.parseNodeSpecialProperty(line, propName, propValue);
            return;
        }
        if (propName === "C") {
            const connProps = propValue.split(",").slice(1);
            const from = parseInt(connProps[0]);
            const to = parseInt(connProps[1]);
            let rest = propValue.split(",").slice(3);
            rest = rest.map(function(elem) {
                return elem.trim().replace(/^"/, "");
            });
            propName = "connections";
            propValue = [
                from,
                to
            ];
            append(propValue, rest);
            if (currentNode[propName] === void 0) {
                currentNode[propName] = [];
            }
        }
        if (propName === "Node") currentNode.id = propValue;
        if (propName in currentNode && Array.isArray(currentNode[propName])) {
            currentNode[propName].push(propValue);
        } else {
            if (propName !== "a") currentNode[propName] = propValue;
            else currentNode.a = propValue;
        }
        this.setCurrentProp(currentNode, propName);
        if (propName === "a" && propValue.slice(-1) !== ",") {
            currentNode.a = parseNumberArray(propValue);
        }
    }
    parseNodePropertyContinued(line) {
        const currentNode = this.getCurrentNode();
        currentNode.a += line;
        if (line.slice(-1) !== ",") {
            currentNode.a = parseNumberArray(currentNode.a);
        }
    }
    // parse "Property70"
    parseNodeSpecialProperty(line, propName, propValue) {
        const props = propValue.split('",').map(function(prop) {
            return prop.trim().replace(/^\"/, "").replace(/\s/, "_");
        });
        const innerPropName = props[0];
        const innerPropType1 = props[1];
        const innerPropType2 = props[2];
        const innerPropFlag = props[3];
        let innerPropValue = props[4];
        switch(innerPropType1){
            case "int":
            case "enum":
            case "bool":
            case "ULongLong":
            case "double":
            case "Number":
            case "FieldOfView":
                innerPropValue = parseFloat(innerPropValue);
                break;
            case "Color":
            case "ColorRGB":
            case "Vector3D":
            case "Lcl_Translation":
            case "Lcl_Rotation":
            case "Lcl_Scaling":
                innerPropValue = parseNumberArray(innerPropValue);
                break;
        }
        this.getPrevNode()[innerPropName] = {
            type: innerPropType1,
            type2: innerPropType2,
            flag: innerPropFlag,
            value: innerPropValue
        };
        this.setCurrentProp(this.getPrevNode(), innerPropName);
    }
}
class BinaryParser {
    parse(buffer) {
        const reader = new BinaryReader(buffer);
        reader.skip(23);
        const version = reader.getUint32();
        if (version < 6400) {
            throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: " + version);
        }
        const allNodes = new FBXTree();
        while(!this.endOfContent(reader)){
            const node = this.parseNode(reader, version);
            if (node !== null) allNodes.add(node.name, node);
        }
        return allNodes;
    }
    // Check if reader has reached the end of content.
    endOfContent(reader) {
        if (reader.size() % 16 === 0) {
            return (reader.getOffset() + 160 + 16 & ~15) >= reader.size();
        } else {
            return reader.getOffset() + 160 + 16 >= reader.size();
        }
    }
    // recursively parse nodes until the end of the file is reached
    parseNode(reader, version) {
        const node = {};
        const endOffset = version >= 7500 ? reader.getUint64() : reader.getUint32();
        const numProperties = version >= 7500 ? reader.getUint64() : reader.getUint32();
        version >= 7500 ? reader.getUint64() : reader.getUint32();
        const nameLen = reader.getUint8();
        const name = reader.getString(nameLen);
        if (endOffset === 0) return null;
        const propertyList = [];
        for(let i = 0; i < numProperties; i++){
            propertyList.push(this.parseProperty(reader));
        }
        const id = propertyList.length > 0 ? propertyList[0] : "";
        const attrName = propertyList.length > 1 ? propertyList[1] : "";
        const attrType = propertyList.length > 2 ? propertyList[2] : "";
        node.singleProperty = numProperties === 1 && reader.getOffset() === endOffset ? true : false;
        while(endOffset > reader.getOffset()){
            const subNode = this.parseNode(reader, version);
            if (subNode !== null) this.parseSubNode(name, node, subNode);
        }
        node.propertyList = propertyList;
        if (typeof id === "number") node.id = id;
        if (attrName !== "") node.attrName = attrName;
        if (attrType !== "") node.attrType = attrType;
        if (name !== "") node.name = name;
        return node;
    }
    parseSubNode(name, node, subNode) {
        if (subNode.singleProperty === true) {
            const value = subNode.propertyList[0];
            if (Array.isArray(value)) {
                node[subNode.name] = subNode;
                subNode.a = value;
            } else {
                node[subNode.name] = value;
            }
        } else if (name === "Connections" && subNode.name === "C") {
            const array = [];
            subNode.propertyList.forEach(function(property, i) {
                if (i !== 0) array.push(property);
            });
            if (node.connections === void 0) {
                node.connections = [];
            }
            node.connections.push(array);
        } else if (subNode.name === "Properties70") {
            const keys = Object.keys(subNode);
            keys.forEach(function(key) {
                node[key] = subNode[key];
            });
        } else if (name === "Properties70" && subNode.name === "P") {
            let innerPropName = subNode.propertyList[0];
            let innerPropType1 = subNode.propertyList[1];
            const innerPropType2 = subNode.propertyList[2];
            const innerPropFlag = subNode.propertyList[3];
            let innerPropValue;
            if (innerPropName.indexOf("Lcl ") === 0) innerPropName = innerPropName.replace("Lcl ", "Lcl_");
            if (innerPropType1.indexOf("Lcl ") === 0) innerPropType1 = innerPropType1.replace("Lcl ", "Lcl_");
            if (innerPropType1 === "Color" || innerPropType1 === "ColorRGB" || innerPropType1 === "Vector" || innerPropType1 === "Vector3D" || innerPropType1.indexOf("Lcl_") === 0) {
                innerPropValue = [
                    subNode.propertyList[4],
                    subNode.propertyList[5],
                    subNode.propertyList[6]
                ];
            } else {
                innerPropValue = subNode.propertyList[4];
            }
            node[innerPropName] = {
                type: innerPropType1,
                type2: innerPropType2,
                flag: innerPropFlag,
                value: innerPropValue
            };
        } else if (node[subNode.name] === void 0) {
            if (typeof subNode.id === "number") {
                node[subNode.name] = {};
                node[subNode.name][subNode.id] = subNode;
            } else {
                node[subNode.name] = subNode;
            }
        } else {
            if (subNode.name === "PoseNode") {
                if (!Array.isArray(node[subNode.name])) {
                    node[subNode.name] = [
                        node[subNode.name]
                    ];
                }
                node[subNode.name].push(subNode);
            } else if (node[subNode.name][subNode.id] === void 0) {
                node[subNode.name][subNode.id] = subNode;
            }
        }
    }
    parseProperty(reader) {
        const type = reader.getString(1);
        let length;
        switch(type){
            case "C":
                return reader.getBoolean();
            case "D":
                return reader.getFloat64();
            case "F":
                return reader.getFloat32();
            case "I":
                return reader.getInt32();
            case "L":
                return reader.getInt64();
            case "R":
                length = reader.getUint32();
                return reader.getArrayBuffer(length);
            case "S":
                length = reader.getUint32();
                return reader.getString(length);
            case "Y":
                return reader.getInt16();
            case "b":
            case "c":
            case "d":
            case "f":
            case "i":
            case "l":
                const arrayLength = reader.getUint32();
                const encoding = reader.getUint32();
                const compressedLength = reader.getUint32();
                if (encoding === 0) {
                    switch(type){
                        case "b":
                        case "c":
                            return reader.getBooleanArray(arrayLength);
                        case "d":
                            return reader.getFloat64Array(arrayLength);
                        case "f":
                            return reader.getFloat32Array(arrayLength);
                        case "i":
                            return reader.getInt32Array(arrayLength);
                        case "l":
                            return reader.getInt64Array(arrayLength);
                    }
                }
                const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$fflate$40$0$2e$6$2e$10$2f$node_modules$2f$fflate$2f$esm$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unzlibSync"])(new Uint8Array(reader.getArrayBuffer(compressedLength)));
                const reader2 = new BinaryReader(data.buffer);
                switch(type){
                    case "b":
                    case "c":
                        return reader2.getBooleanArray(arrayLength);
                    case "d":
                        return reader2.getFloat64Array(arrayLength);
                    case "f":
                        return reader2.getFloat32Array(arrayLength);
                    case "i":
                        return reader2.getInt32Array(arrayLength);
                    case "l":
                        return reader2.getInt64Array(arrayLength);
                }
            default:
                throw new Error("THREE.FBXLoader: Unknown property type " + type);
        }
    }
}
class BinaryReader {
    constructor(buffer, littleEndian){
        this.dv = new DataView(buffer);
        this.offset = 0;
        this.littleEndian = littleEndian !== void 0 ? littleEndian : true;
    }
    getOffset() {
        return this.offset;
    }
    size() {
        return this.dv.buffer.byteLength;
    }
    skip(length) {
        this.offset += length;
    }
    // seems like true/false representation depends on exporter.
    // true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
    // then sees LSB.
    getBoolean() {
        return (this.getUint8() & 1) === 1;
    }
    getBooleanArray(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getBoolean());
        }
        return a;
    }
    getUint8() {
        const value = this.dv.getUint8(this.offset);
        this.offset += 1;
        return value;
    }
    getInt16() {
        const value = this.dv.getInt16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    }
    getInt32() {
        const value = this.dv.getInt32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    getInt32Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getInt32());
        }
        return a;
    }
    getUint32() {
        const value = this.dv.getUint32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    // JavaScript doesn't support 64-bit integer so calculate this here
    // 1 << 32 will return 1 so using multiply operation instead here.
    // There's a possibility that this method returns wrong value if the value
    // is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
    // TODO: safely handle 64-bit integer
    getInt64() {
        let low, high;
        if (this.littleEndian) {
            low = this.getUint32();
            high = this.getUint32();
        } else {
            high = this.getUint32();
            low = this.getUint32();
        }
        if (high & 2147483648) {
            high = ~high & 4294967295;
            low = ~low & 4294967295;
            if (low === 4294967295) high = high + 1 & 4294967295;
            low = low + 1 & 4294967295;
            return -(high * 4294967296 + low);
        }
        return high * 4294967296 + low;
    }
    getInt64Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getInt64());
        }
        return a;
    }
    // Note: see getInt64() comment
    getUint64() {
        let low, high;
        if (this.littleEndian) {
            low = this.getUint32();
            high = this.getUint32();
        } else {
            high = this.getUint32();
            low = this.getUint32();
        }
        return high * 4294967296 + low;
    }
    getFloat32() {
        const value = this.dv.getFloat32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    }
    getFloat32Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getFloat32());
        }
        return a;
    }
    getFloat64() {
        const value = this.dv.getFloat64(this.offset, this.littleEndian);
        this.offset += 8;
        return value;
    }
    getFloat64Array(size) {
        const a = [];
        for(let i = 0; i < size; i++){
            a.push(this.getFloat64());
        }
        return a;
    }
    getArrayBuffer(size) {
        const value = this.dv.buffer.slice(this.offset, this.offset + size);
        this.offset += size;
        return value;
    }
    getString(size) {
        let a = [];
        for(let i = 0; i < size; i++){
            a[i] = this.getUint8();
        }
        const nullByte = a.indexOf(0);
        if (nullByte >= 0) a = a.slice(0, nullByte);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(a));
    }
}
class FBXTree {
    add(key, val) {
        this[key] = val;
    }
}
function isFbxFormatBinary(buffer) {
    const CORRECT = "Kaydara FBX Binary  \0";
    return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString(buffer, 0, CORRECT.length);
}
function isFbxFormatASCII(text) {
    const CORRECT = [
        "K",
        "a",
        "y",
        "d",
        "a",
        "r",
        "a",
        "\\",
        "F",
        "B",
        "X",
        "\\",
        "B",
        "i",
        "n",
        "a",
        "r",
        "y",
        "\\",
        "\\"
    ];
    let cursor = 0;
    function read(offset) {
        const result = text[offset - 1];
        text = text.slice(cursor + offset);
        cursor++;
        return result;
    }
    for(let i = 0; i < CORRECT.length; ++i){
        const num = read(1);
        if (num === CORRECT[i]) {
            return false;
        }
    }
    return true;
}
function getFbxVersion(text) {
    const versionRegExp = /FBXVersion: (\d+)/;
    const match = text.match(versionRegExp);
    if (match) {
        const version = parseInt(match[1]);
        return version;
    }
    throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.");
}
function convertFBXTimeToSeconds(time) {
    return time / 46186158e3;
}
const dataArray = [];
function getData(polygonVertexIndex, polygonIndex, vertexIndex, infoObject) {
    let index;
    switch(infoObject.mappingType){
        case "ByPolygonVertex":
            index = polygonVertexIndex;
            break;
        case "ByPolygon":
            index = polygonIndex;
            break;
        case "ByVertice":
            index = vertexIndex;
            break;
        case "AllSame":
            index = infoObject.indices[0];
            break;
        default:
            console.warn("THREE.FBXLoader: unknown attribute mapping type " + infoObject.mappingType);
    }
    if (infoObject.referenceType === "IndexToDirect") index = infoObject.indices[index];
    const from = index * infoObject.dataSize;
    const to = from + infoObject.dataSize;
    return slice(dataArray, infoObject.buffer, from, to);
}
const tempEuler = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]();
const tempVec = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
function generateTransform(transformData) {
    const lTranslationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lPreRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lPostRotationM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingPivotM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lScalingOffsetM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationOffsetM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lRotationPivotM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lParentGX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lParentLX = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const lGlobalT = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    const inheritType = transformData.inheritType ? transformData.inheritType : 0;
    if (transformData.translation) lTranslationM.setPosition(tempVec.fromArray(transformData.translation));
    if (transformData.preRotation) {
        const array = transformData.preRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lPreRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
    }
    if (transformData.rotation) {
        const array = transformData.rotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
    }
    if (transformData.postRotation) {
        const array = transformData.postRotation.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].degToRad);
        array.push(transformData.eulerOrder);
        lPostRotationM.makeRotationFromEuler(tempEuler.fromArray(array));
        lPostRotationM.invert();
    }
    if (transformData.scale) lScalingM.scale(tempVec.fromArray(transformData.scale));
    if (transformData.scalingOffset) lScalingOffsetM.setPosition(tempVec.fromArray(transformData.scalingOffset));
    if (transformData.scalingPivot) lScalingPivotM.setPosition(tempVec.fromArray(transformData.scalingPivot));
    if (transformData.rotationOffset) lRotationOffsetM.setPosition(tempVec.fromArray(transformData.rotationOffset));
    if (transformData.rotationPivot) lRotationPivotM.setPosition(tempVec.fromArray(transformData.rotationPivot));
    if (transformData.parentMatrixWorld) {
        lParentLX.copy(transformData.parentMatrix);
        lParentGX.copy(transformData.parentMatrixWorld);
    }
    const lLRM = lPreRotationM.clone().multiply(lRotationM).multiply(lPostRotationM);
    const lParentGRM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    lParentGRM.extractRotation(lParentGX);
    const lParentTM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    lParentTM.copyPosition(lParentGX);
    const lParentGRSM = lParentTM.clone().invert().multiply(lParentGX);
    const lParentGSM = lParentGRM.clone().invert().multiply(lParentGRSM);
    const lLSM = lScalingM;
    const lGlobalRS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
    if (inheritType === 0) {
        lGlobalRS.copy(lParentGRM).multiply(lLRM).multiply(lParentGSM).multiply(lLSM);
    } else if (inheritType === 1) {
        lGlobalRS.copy(lParentGRM).multiply(lParentGSM).multiply(lLRM).multiply(lLSM);
    } else {
        const lParentLSM = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().scale(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromMatrixScale(lParentLX));
        const lParentLSM_inv = lParentLSM.clone().invert();
        const lParentGSM_noLocal = lParentGSM.clone().multiply(lParentLSM_inv);
        lGlobalRS.copy(lParentGRM).multiply(lLRM).multiply(lParentGSM_noLocal).multiply(lLSM);
    }
    const lRotationPivotM_inv = lRotationPivotM.clone().invert();
    const lScalingPivotM_inv = lScalingPivotM.clone().invert();
    let lTransform = lTranslationM.clone().multiply(lRotationOffsetM).multiply(lRotationPivotM).multiply(lPreRotationM).multiply(lRotationM).multiply(lPostRotationM).multiply(lRotationPivotM_inv).multiply(lScalingOffsetM).multiply(lScalingPivotM).multiply(lScalingM).multiply(lScalingPivotM_inv);
    const lLocalTWithAllPivotAndOffsetInfo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copyPosition(lTransform);
    const lGlobalTranslation = lParentGX.clone().multiply(lLocalTWithAllPivotAndOffsetInfo);
    lGlobalT.copyPosition(lGlobalTranslation);
    lTransform = lGlobalT.clone().multiply(lGlobalRS);
    lTransform.premultiply(lParentGX.invert());
    return lTransform;
}
function getEulerOrder(order) {
    order = order || 0;
    const enums = [
        "ZYX",
        // -> XYZ extrinsic
        "YZX",
        // -> XZY extrinsic
        "XZY",
        // -> YZX extrinsic
        "ZXY",
        // -> YXZ extrinsic
        "YXZ",
        // -> ZXY extrinsic
        "XYZ"
    ];
    if (order === 6) {
        console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.");
        return enums[0];
    }
    return enums[order];
}
function parseNumberArray(value) {
    const array = value.split(",").map(function(val) {
        return parseFloat(val);
    });
    return array;
}
function convertArrayBufferToString(buffer, from, to) {
    if (from === void 0) from = 0;
    if (to === void 0) to = buffer.byteLength;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$LoaderUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeText"])(new Uint8Array(buffer, from, to));
}
function append(a, b) {
    for(let i = 0, j = a.length, l = b.length; i < l; i++, j++){
        a[j] = b[i];
    }
}
function slice(a, b, from, to) {
    for(let i = from, j = 0; i < to; i++, j++){
        a[j] = b[i];
    }
    return a;
}
function inject(a1, index, a2) {
    return a1.slice(0, index).concat(a2).concat(a1.slice(index));
}
;
 //# sourceMappingURL=FBXLoader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/utils/WorkerPool.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkerPool",
    ()=>WorkerPool
]);
class WorkerPool {
    constructor(pool = 4){
        this.pool = pool;
        this.queue = [];
        this.workers = [];
        this.workersResolve = [];
        this.workerStatus = 0;
    }
    _initWorker(workerId) {
        if (!this.workers[workerId]) {
            const worker = this.workerCreator();
            worker.addEventListener("message", this._onMessage.bind(this, workerId));
            this.workers[workerId] = worker;
        }
    }
    _getIdleWorker() {
        for(let i = 0; i < this.pool; i++)if (!(this.workerStatus & 1 << i)) return i;
        return -1;
    }
    _onMessage(workerId, msg) {
        const resolve = this.workersResolve[workerId];
        resolve && resolve(msg);
        if (this.queue.length) {
            const { resolve: resolve2, msg: msg2, transfer } = this.queue.shift();
            this.workersResolve[workerId] = resolve2;
            this.workers[workerId].postMessage(msg2, transfer);
        } else {
            this.workerStatus ^= 1 << workerId;
        }
    }
    setWorkerCreator(workerCreator) {
        this.workerCreator = workerCreator;
    }
    setWorkerLimit(pool) {
        this.pool = pool;
    }
    postMessage(msg, transfer) {
        return new Promise((resolve)=>{
            const workerId = this._getIdleWorker();
            if (workerId !== -1) {
                this._initWorker(workerId);
                this.workerStatus |= 1 << workerId;
                this.workersResolve[workerId] = resolve;
                this.workers[workerId].postMessage(msg, transfer);
            } else {
                this.queue.push({
                    resolve,
                    msg,
                    transfer
                });
            }
        });
    }
    dispose() {
        this.workers.forEach((worker)=>worker.terminate());
        this.workersResolve.length = 0;
        this.workers.length = 0;
        this.queue.length = 0;
        this.workerStatus = 0;
    }
}
;
 //# sourceMappingURL=WorkerPool.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/libs/ktx-parse.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KHR_DF_FLAG_ALPHA_PREMULTIPLIED",
    ()=>KHR_DF_FLAG_ALPHA_PREMULTIPLIED,
    "KHR_DF_FLAG_ALPHA_STRAIGHT",
    ()=>KHR_DF_FLAG_ALPHA_STRAIGHT,
    "KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT",
    ()=>KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
    "KHR_DF_MODEL_UNSPECIFIED",
    ()=>KHR_DF_MODEL_UNSPECIFIED,
    "KHR_DF_PRIMARIES_BT709",
    ()=>KHR_DF_PRIMARIES_BT709,
    "KHR_DF_PRIMARIES_DISPLAYP3",
    ()=>KHR_DF_PRIMARIES_DISPLAYP3,
    "KHR_DF_PRIMARIES_UNSPECIFIED",
    ()=>KHR_DF_PRIMARIES_UNSPECIFIED,
    "KHR_DF_SAMPLE_DATATYPE_SIGNED",
    ()=>KHR_DF_SAMPLE_DATATYPE_SIGNED,
    "KHR_DF_TRANSFER_SRGB",
    ()=>KHR_DF_TRANSFER_SRGB,
    "KHR_DF_VENDORID_KHRONOS",
    ()=>KHR_DF_VENDORID_KHRONOS,
    "KHR_DF_VERSION",
    ()=>KHR_DF_VERSION,
    "KHR_SUPERCOMPRESSION_NONE",
    ()=>KHR_SUPERCOMPRESSION_NONE,
    "KHR_SUPERCOMPRESSION_ZSTD",
    ()=>KHR_SUPERCOMPRESSION_ZSTD,
    "KTX2Container",
    ()=>KTX2Container,
    "VK_FORMAT_ASTC_6x6_SRGB_BLOCK",
    ()=>VK_FORMAT_ASTC_6x6_SRGB_BLOCK,
    "VK_FORMAT_ASTC_6x6_UNORM_BLOCK",
    ()=>VK_FORMAT_ASTC_6x6_UNORM_BLOCK,
    "VK_FORMAT_R16G16B16A16_SFLOAT",
    ()=>VK_FORMAT_R16G16B16A16_SFLOAT,
    "VK_FORMAT_R16G16_SFLOAT",
    ()=>VK_FORMAT_R16G16_SFLOAT,
    "VK_FORMAT_R16_SFLOAT",
    ()=>VK_FORMAT_R16_SFLOAT,
    "VK_FORMAT_R32G32B32A32_SFLOAT",
    ()=>VK_FORMAT_R32G32B32A32_SFLOAT,
    "VK_FORMAT_R32G32_SFLOAT",
    ()=>VK_FORMAT_R32G32_SFLOAT,
    "VK_FORMAT_R32_SFLOAT",
    ()=>VK_FORMAT_R32_SFLOAT,
    "VK_FORMAT_R8G8B8A8_SRGB",
    ()=>VK_FORMAT_R8G8B8A8_SRGB,
    "VK_FORMAT_R8G8B8A8_UNORM",
    ()=>VK_FORMAT_R8G8B8A8_UNORM,
    "VK_FORMAT_R8G8_SRGB",
    ()=>VK_FORMAT_R8G8_SRGB,
    "VK_FORMAT_R8G8_UNORM",
    ()=>VK_FORMAT_R8G8_UNORM,
    "VK_FORMAT_R8_SRGB",
    ()=>VK_FORMAT_R8_SRGB,
    "VK_FORMAT_R8_UNORM",
    ()=>VK_FORMAT_R8_UNORM,
    "VK_FORMAT_UNDEFINED",
    ()=>VK_FORMAT_UNDEFINED,
    "read",
    ()=>read
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$8_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.8_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
const KHR_SUPERCOMPRESSION_NONE = 0;
const KHR_SUPERCOMPRESSION_ZSTD = 2;
const KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0;
const KHR_DF_VENDORID_KHRONOS = 0;
const KHR_DF_VERSION = 2;
const KHR_DF_MODEL_UNSPECIFIED = 0;
const KHR_DF_FLAG_ALPHA_STRAIGHT = 0;
const KHR_DF_FLAG_ALPHA_PREMULTIPLIED = 1;
const KHR_DF_TRANSFER_SRGB = 2;
const KHR_DF_PRIMARIES_UNSPECIFIED = 0;
const KHR_DF_PRIMARIES_BT709 = 1;
const KHR_DF_PRIMARIES_DISPLAYP3 = 10;
const KHR_DF_SAMPLE_DATATYPE_SIGNED = 64;
const VK_FORMAT_UNDEFINED = 0;
const VK_FORMAT_R8_UNORM = 9;
const VK_FORMAT_R8_SRGB = 15;
const VK_FORMAT_R8G8_UNORM = 16;
const VK_FORMAT_R8G8_SRGB = 22;
const VK_FORMAT_R8G8B8A8_UNORM = 37;
const VK_FORMAT_R8G8B8A8_SRGB = 43;
const VK_FORMAT_R16_SFLOAT = 76;
const VK_FORMAT_R16G16_SFLOAT = 83;
const VK_FORMAT_R16G16B16A16_SFLOAT = 97;
const VK_FORMAT_R32_SFLOAT = 100;
const VK_FORMAT_R32G32_SFLOAT = 103;
const VK_FORMAT_R32G32B32A32_SFLOAT = 109;
const VK_FORMAT_ASTC_6x6_UNORM_BLOCK = 165;
const VK_FORMAT_ASTC_6x6_SRGB_BLOCK = 166;
class KTX2Container {
    constructor(){
        this.vkFormat = VK_FORMAT_UNDEFINED;
        this.typeSize = 1;
        this.pixelWidth = 0;
        this.pixelHeight = 0;
        this.pixelDepth = 0;
        this.layerCount = 0;
        this.faceCount = 1;
        this.supercompressionScheme = KHR_SUPERCOMPRESSION_NONE;
        this.levels = [];
        this.dataFormatDescriptor = [
            {
                vendorId: KHR_DF_VENDORID_KHRONOS,
                descriptorType: KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
                descriptorBlockSize: 0,
                versionNumber: KHR_DF_VERSION,
                colorModel: KHR_DF_MODEL_UNSPECIFIED,
                colorPrimaries: KHR_DF_PRIMARIES_BT709,
                transferFunction: KHR_DF_TRANSFER_SRGB,
                flags: KHR_DF_FLAG_ALPHA_STRAIGHT,
                texelBlockDimension: [
                    0,
                    0,
                    0,
                    0
                ],
                bytesPlane: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                samples: []
            }
        ];
        this.keyValue = {};
        this.globalData = null;
    }
}
class BufferReader {
    constructor(data, byteOffset, byteLength, littleEndian){
        this._dataView = void 0;
        this._littleEndian = void 0;
        this._offset = void 0;
        this._dataView = new DataView(data.buffer, data.byteOffset + byteOffset, byteLength);
        this._littleEndian = littleEndian;
        this._offset = 0;
    }
    _nextUint8() {
        const value = this._dataView.getUint8(this._offset);
        this._offset += 1;
        return value;
    }
    _nextUint16() {
        const value = this._dataView.getUint16(this._offset, this._littleEndian);
        this._offset += 2;
        return value;
    }
    _nextUint32() {
        const value = this._dataView.getUint32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    _nextUint64() {
        const left = this._dataView.getUint32(this._offset, this._littleEndian);
        const right = this._dataView.getUint32(this._offset + 4, this._littleEndian);
        const value = left + 2 ** 32 * right;
        this._offset += 8;
        return value;
    }
    _nextInt32() {
        const value = this._dataView.getInt32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    _nextUint8Array(len) {
        const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, len);
        this._offset += len;
        return value;
    }
    _skip(bytes) {
        this._offset += bytes;
        return this;
    }
    _scan(maxByteLength, term) {
        if (term === void 0) {
            term = 0;
        }
        const byteOffset = this._offset;
        let byteLength = 0;
        while(this._dataView.getUint8(this._offset) !== term && byteLength < maxByteLength){
            byteLength++;
            this._offset++;
        }
        if (byteLength < maxByteLength) this._offset++;
        return new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + byteOffset, byteLength);
    }
}
const KTX2_ID = [
    // '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
    171,
    75,
    84,
    88,
    32,
    50,
    48,
    187,
    13,
    10,
    26,
    10
];
function decodeText(buffer) {
    if (typeof TextDecoder !== "undefined") {
        return new TextDecoder().decode(buffer);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$8_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(buffer).toString("utf8");
}
function read(data) {
    const id = new Uint8Array(data.buffer, data.byteOffset, KTX2_ID.length);
    if (id[0] !== KTX2_ID[0] || // '´'
    id[1] !== KTX2_ID[1] || // 'K'
    id[2] !== KTX2_ID[2] || // 'T'
    id[3] !== KTX2_ID[3] || // 'X'
    id[4] !== KTX2_ID[4] || // ' '
    id[5] !== KTX2_ID[5] || // '2'
    id[6] !== KTX2_ID[6] || // '0'
    id[7] !== KTX2_ID[7] || // 'ª'
    id[8] !== KTX2_ID[8] || // '\r'
    id[9] !== KTX2_ID[9] || // '\n'
    id[10] !== KTX2_ID[10] || // '\x1A'
    id[11] !== KTX2_ID[11]) {
        throw new Error("Missing KTX 2.0 identifier.");
    }
    const container = new KTX2Container();
    const headerByteLength = 17 * Uint32Array.BYTES_PER_ELEMENT;
    const headerReader = new BufferReader(data, KTX2_ID.length, headerByteLength, true);
    container.vkFormat = headerReader._nextUint32();
    container.typeSize = headerReader._nextUint32();
    container.pixelWidth = headerReader._nextUint32();
    container.pixelHeight = headerReader._nextUint32();
    container.pixelDepth = headerReader._nextUint32();
    container.layerCount = headerReader._nextUint32();
    container.faceCount = headerReader._nextUint32();
    const levelCount = headerReader._nextUint32();
    container.supercompressionScheme = headerReader._nextUint32();
    const dfdByteOffset = headerReader._nextUint32();
    const dfdByteLength = headerReader._nextUint32();
    const kvdByteOffset = headerReader._nextUint32();
    const kvdByteLength = headerReader._nextUint32();
    const sgdByteOffset = headerReader._nextUint64();
    const sgdByteLength = headerReader._nextUint64();
    const levelByteLength = levelCount * 3 * 8;
    const levelReader = new BufferReader(data, KTX2_ID.length + headerByteLength, levelByteLength, true);
    for(let i = 0; i < levelCount; i++){
        container.levels.push({
            levelData: new Uint8Array(data.buffer, data.byteOffset + levelReader._nextUint64(), levelReader._nextUint64()),
            uncompressedByteLength: levelReader._nextUint64()
        });
    }
    const dfdReader = new BufferReader(data, dfdByteOffset, dfdByteLength, true);
    const dfd = {
        vendorId: dfdReader._skip(4)._nextUint16(),
        descriptorType: dfdReader._nextUint16(),
        versionNumber: dfdReader._nextUint16(),
        descriptorBlockSize: dfdReader._nextUint16(),
        colorModel: dfdReader._nextUint8(),
        colorPrimaries: dfdReader._nextUint8(),
        transferFunction: dfdReader._nextUint8(),
        flags: dfdReader._nextUint8(),
        texelBlockDimension: [
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8()
        ],
        bytesPlane: [
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8(),
            dfdReader._nextUint8()
        ],
        samples: []
    };
    const sampleStart = 6;
    const sampleWords = 4;
    const numSamples = (dfd.descriptorBlockSize / 4 - sampleStart) / sampleWords;
    for(let i = 0; i < numSamples; i++){
        const sample = {
            bitOffset: dfdReader._nextUint16(),
            bitLength: dfdReader._nextUint8(),
            channelType: dfdReader._nextUint8(),
            samplePosition: [
                dfdReader._nextUint8(),
                dfdReader._nextUint8(),
                dfdReader._nextUint8(),
                dfdReader._nextUint8()
            ],
            sampleLower: -Infinity,
            sampleUpper: Infinity
        };
        if (sample.channelType & KHR_DF_SAMPLE_DATATYPE_SIGNED) {
            sample.sampleLower = dfdReader._nextInt32();
            sample.sampleUpper = dfdReader._nextInt32();
        } else {
            sample.sampleLower = dfdReader._nextUint32();
            sample.sampleUpper = dfdReader._nextUint32();
        }
        dfd.samples[i] = sample;
    }
    container.dataFormatDescriptor.length = 0;
    container.dataFormatDescriptor.push(dfd);
    const kvdReader = new BufferReader(data, kvdByteOffset, kvdByteLength, true);
    while(kvdReader._offset < kvdByteLength){
        const keyValueByteLength = kvdReader._nextUint32();
        const keyData = kvdReader._scan(keyValueByteLength);
        const key = decodeText(keyData);
        container.keyValue[key] = kvdReader._nextUint8Array(keyValueByteLength - keyData.byteLength - 1);
        if (key.match(/^ktx/i)) {
            const text = decodeText(container.keyValue[key]);
            container.keyValue[key] = text.substring(0, text.lastIndexOf("\0"));
        }
        const kvPadding = keyValueByteLength % 4 ? 4 - keyValueByteLength % 4 : 0;
        kvdReader._skip(kvPadding);
    }
    if (sgdByteLength <= 0) return container;
    const sgdReader = new BufferReader(data, sgdByteOffset, sgdByteLength, true);
    const endpointCount = sgdReader._nextUint16();
    const selectorCount = sgdReader._nextUint16();
    const endpointsByteLength = sgdReader._nextUint32();
    const selectorsByteLength = sgdReader._nextUint32();
    const tablesByteLength = sgdReader._nextUint32();
    const extendedByteLength = sgdReader._nextUint32();
    const imageDescs = [];
    for(let i = 0; i < levelCount; i++){
        imageDescs.push({
            imageFlags: sgdReader._nextUint32(),
            rgbSliceByteOffset: sgdReader._nextUint32(),
            rgbSliceByteLength: sgdReader._nextUint32(),
            alphaSliceByteOffset: sgdReader._nextUint32(),
            alphaSliceByteLength: sgdReader._nextUint32()
        });
    }
    const endpointsByteOffset = sgdByteOffset + sgdReader._offset;
    const selectorsByteOffset = endpointsByteOffset + endpointsByteLength;
    const tablesByteOffset = selectorsByteOffset + selectorsByteLength;
    const extendedByteOffset = tablesByteOffset + tablesByteLength;
    const endpointsData = new Uint8Array(data.buffer, data.byteOffset + endpointsByteOffset, endpointsByteLength);
    const selectorsData = new Uint8Array(data.buffer, data.byteOffset + selectorsByteOffset, selectorsByteLength);
    const tablesData = new Uint8Array(data.buffer, data.byteOffset + tablesByteOffset, tablesByteLength);
    const extendedData = new Uint8Array(data.buffer, data.byteOffset + extendedByteOffset, extendedByteLength);
    container.globalData = {
        endpointCount,
        selectorCount,
        imageDescs,
        endpointsData,
        selectorsData,
        tablesData,
        extendedData
    };
    return container;
}
;
 //# sourceMappingURL=ktx-parse.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/libs/zstddec.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZSTDDecoder",
    ()=>ZSTDDecoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$8_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.8_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
let init;
let instance;
let heap;
const IMPORT_OBJECT = {
    env: {
        emscripten_notify_memory_growth: function(index) {
            heap = new Uint8Array(instance.exports.memory.buffer);
        }
    }
};
class ZSTDDecoder {
    init() {
        if (init) return init;
        if (typeof fetch !== "undefined") {
            init = fetch("data:application/wasm;base64," + wasm).then((response)=>response.arrayBuffer()).then((arrayBuffer)=>WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT)).then(this._init);
        } else {
            init = WebAssembly.instantiate(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$8_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(wasm, "base64"), IMPORT_OBJECT).then(this._init);
        }
        return init;
    }
    _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(0);
    }
    decode(array, uncompressedSize = 0) {
        if (!instance) throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
    }
}
const wasm = "AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ";
;
 //# sourceMappingURL=zstddec.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/CompressedCubeTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompressedCubeTexture",
    ()=>CompressedCubeTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class CompressedCubeTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"] {
    constructor(images, format, type){
        super(void 0, images[0].width, images[0].height, format, type, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CubeReflectionMapping"]);
        this.isCompressedCubeTexture = true;
        this.isCubeTexture = true;
        this.image = images;
    }
}
;
 //# sourceMappingURL=CompressedCubeTexture.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/CompressedArrayTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompressedArrayTexture",
    ()=>CompressedArrayTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class CompressedArrayTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"] {
    constructor(mipmaps, width, height, depth, format, type){
        super(mipmaps, width, height, format, type);
        this.isCompressedArrayTexture = true;
        this.image.depth = depth;
        this.wrapR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
    }
}
;
 //# sourceMappingURL=CompressedArrayTexture.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/Data3DTexture.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Data3DTexture",
    ()=>Data3DTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
class Data3DTexture extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Texture"] {
    constructor(data = null, width = 1, height = 1, depth = 1){
        super(null);
        this.isData3DTexture = true;
        this.image = {
            data,
            width,
            height,
            depth
        };
        this.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
        this.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
        this.wrapR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
;
 //# sourceMappingURL=Data3DTexture.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/loaders/KTX2Loader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KTX2Loader",
    ()=>KTX2Loader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$WorkerPool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/utils/WorkerPool.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/libs/ktx-parse.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$zstddec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/libs/zstddec.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedCubeTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/CompressedCubeTexture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedArrayTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/CompressedArrayTexture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$Data3DTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/Data3DTexture.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
;
;
;
;
;
const LinearEncoding = 3e3;
const sRGBEncoding = 3001;
const NoColorSpace = "";
const DisplayP3ColorSpace = "display-p3";
const LinearDisplayP3ColorSpace = "display-p3-linear";
const LinearSRGBColorSpace = "srgb-linear";
const SRGBColorSpace = "srgb";
const _taskCache = /* @__PURE__ */ new WeakMap();
let _activeLoaders = 0;
let _zstd;
const KTX2Loader = /* @__PURE__ */ (()=>{
    const _KTX2Loader = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Loader"] {
        constructor(manager){
            super(manager);
            this.transcoderPath = "";
            this.transcoderBinary = null;
            this.transcoderPending = null;
            this.workerPool = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$utils$2f$WorkerPool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkerPool"]();
            this.workerSourceURL = "";
            this.workerConfig = null;
            if (typeof MSC_TRANSCODER !== "undefined") {
                console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.');
            }
        }
        setTranscoderPath(path) {
            this.transcoderPath = path;
            return this;
        }
        setWorkerLimit(num) {
            this.workerPool.setWorkerLimit(num);
            return this;
        }
        detectSupport(renderer) {
            this.workerConfig = {
                astcSupported: renderer.extensions.has("WEBGL_compressed_texture_astc"),
                etc1Supported: renderer.extensions.has("WEBGL_compressed_texture_etc1"),
                etc2Supported: renderer.extensions.has("WEBGL_compressed_texture_etc"),
                dxtSupported: renderer.extensions.has("WEBGL_compressed_texture_s3tc"),
                bptcSupported: renderer.extensions.has("EXT_texture_compression_bptc"),
                pvrtcSupported: renderer.extensions.has("WEBGL_compressed_texture_pvrtc") || renderer.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
            };
            if (renderer.capabilities.isWebGL2) {
                this.workerConfig.etc1Supported = false;
            }
            return this;
        }
        init() {
            if (!this.transcoderPending) {
                const jsLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
                jsLoader.setPath(this.transcoderPath);
                jsLoader.setWithCredentials(this.withCredentials);
                const jsContent = jsLoader.loadAsync("basis_transcoder.js");
                const binaryLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
                binaryLoader.setPath(this.transcoderPath);
                binaryLoader.setResponseType("arraybuffer");
                binaryLoader.setWithCredentials(this.withCredentials);
                const binaryContent = binaryLoader.loadAsync("basis_transcoder.wasm");
                this.transcoderPending = Promise.all([
                    jsContent,
                    binaryContent
                ]).then(([jsContent2, binaryContent2])=>{
                    const fn = _KTX2Loader.BasisWorker.toString();
                    const body = [
                        "/* constants */",
                        "let _EngineFormat = " + JSON.stringify(_KTX2Loader.EngineFormat),
                        "let _TranscoderFormat = " + JSON.stringify(_KTX2Loader.TranscoderFormat),
                        "let _BasisFormat = " + JSON.stringify(_KTX2Loader.BasisFormat),
                        "/* basis_transcoder.js */",
                        jsContent2,
                        "/* worker */",
                        fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
                    ].join("\n");
                    this.workerSourceURL = URL.createObjectURL(new Blob([
                        body
                    ]));
                    this.transcoderBinary = binaryContent2;
                    this.workerPool.setWorkerCreator(()=>{
                        const worker = new Worker(this.workerSourceURL);
                        const transcoderBinary = this.transcoderBinary.slice(0);
                        worker.postMessage({
                            type: "init",
                            config: this.workerConfig,
                            transcoderBinary
                        }, [
                            transcoderBinary
                        ]);
                        return worker;
                    });
                });
                if (_activeLoaders > 0) {
                    console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.");
                }
                _activeLoaders++;
            }
            return this.transcoderPending;
        }
        load(url, onLoad, onProgress, onError) {
            if (this.workerConfig === null) {
                throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
            }
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileLoader"](this.manager);
            loader.setResponseType("arraybuffer");
            loader.setWithCredentials(this.withCredentials);
            loader.load(url, (buffer)=>{
                if (_taskCache.has(buffer)) {
                    const cachedTask = _taskCache.get(buffer);
                    return cachedTask.promise.then(onLoad).catch(onError);
                }
                this._createTexture(buffer).then((texture)=>onLoad ? onLoad(texture) : null).catch(onError);
            }, onProgress, onError);
        }
        _createTextureFrom(transcodeResult, container) {
            const { faces, width, height, format, type, error, dfdFlags } = transcodeResult;
            if (type === "error") return Promise.reject(error);
            let texture;
            if (container.faceCount === 6) {
                texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedCubeTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedCubeTexture"](faces, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]);
            } else {
                const mipmaps = faces[0].mipmaps;
                texture = container.layerCount > 1 ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$CompressedArrayTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedArrayTexture"](mipmaps, width, height, container.layerCount, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"](mipmaps, width, height, format, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]);
            }
            texture.minFilter = faces[0].mipmaps.length === 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearMipmapLinearFilter"];
            texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            const colorSpace = parseColorSpace(container);
            if ("colorSpace" in texture) texture.colorSpace = colorSpace;
            else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
            texture.premultiplyAlpha = !!(dfdFlags & __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_FLAG_ALPHA_PREMULTIPLIED"]);
            return texture;
        }
        /**
     * @param {ArrayBuffer} buffer
     * @param {object?} config
     * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
     */ async _createTexture(buffer, config = {}) {
            const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["read"])(new Uint8Array(buffer));
            if (container.vkFormat !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_UNDEFINED"]) {
                return createRawTexture(container);
            }
            const taskConfig = config;
            const texturePending = this.init().then(()=>{
                return this.workerPool.postMessage({
                    type: "transcode",
                    buffer,
                    taskConfig
                }, [
                    buffer
                ]);
            }).then((e)=>this._createTextureFrom(e.data, container));
            _taskCache.set(buffer, {
                promise: texturePending
            });
            return texturePending;
        }
        dispose() {
            this.workerPool.dispose();
            if (this.workerSourceURL) URL.revokeObjectURL(this.workerSourceURL);
            _activeLoaders--;
            return this;
        }
    };
    let KTX2Loader2 = _KTX2Loader;
    /* CONSTANTS */ __publicField(KTX2Loader2, "BasisFormat", {
        ETC1S: 0,
        UASTC_4x4: 1
    });
    __publicField(KTX2Loader2, "TranscoderFormat", {
        ETC1: 0,
        ETC2: 1,
        BC1: 2,
        BC3: 3,
        BC4: 4,
        BC5: 5,
        BC7_M6_OPAQUE_ONLY: 6,
        BC7_M5: 7,
        PVRTC1_4_RGB: 8,
        PVRTC1_4_RGBA: 9,
        ASTC_4x4: 10,
        ATC_RGB: 11,
        ATC_RGBA_INTERPOLATED_ALPHA: 12,
        RGBA32: 13,
        RGB565: 14,
        BGR565: 15,
        RGBA4444: 16
    });
    __publicField(KTX2Loader2, "EngineFormat", {
        RGBAFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
        RGBA_ASTC_4x4_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_ASTC_4x4_Format"],
        RGBA_BPTC_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_BPTC_Format"],
        RGBA_ETC2_EAC_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_ETC2_EAC_Format"],
        RGBA_PVRTC_4BPPV1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_PVRTC_4BPPV1_Format"],
        RGBA_S3TC_DXT5_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_S3TC_DXT5_Format"],
        RGB_ETC1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGB_ETC1_Format"],
        RGB_ETC2_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGB_ETC2_Format"],
        RGB_PVRTC_4BPPV1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGB_PVRTC_4BPPV1_Format"],
        RGB_S3TC_DXT1_Format: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGB_S3TC_DXT1_Format"]
    });
    /* WEB WORKER */ __publicField(KTX2Loader2, "BasisWorker", function() {
        let config;
        let transcoderPending;
        let BasisModule;
        const EngineFormat = _EngineFormat;
        const TranscoderFormat = _TranscoderFormat;
        const BasisFormat = _BasisFormat;
        self.addEventListener("message", function(e) {
            const message = e.data;
            switch(message.type){
                case "init":
                    config = message.config;
                    init(message.transcoderBinary);
                    break;
                case "transcode":
                    transcoderPending.then(()=>{
                        try {
                            const { faces, buffers, width, height, hasAlpha, format, dfdFlags } = transcode(message.buffer);
                            self.postMessage({
                                type: "transcode",
                                id: message.id,
                                faces,
                                width,
                                height,
                                hasAlpha,
                                format,
                                dfdFlags
                            }, buffers);
                        } catch (error) {
                            console.error(error);
                            self.postMessage({
                                type: "error",
                                id: message.id,
                                error: error.message
                            });
                        }
                    });
                    break;
            }
        });
        function init(wasmBinary) {
            transcoderPending = new Promise((resolve)=>{
                BasisModule = {
                    wasmBinary,
                    onRuntimeInitialized: resolve
                };
                BASIS(BasisModule);
            }).then(()=>{
                BasisModule.initializeBasis();
                if (BasisModule.KTX2File === void 0) {
                    console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
                }
            });
        }
        function transcode(buffer) {
            const ktx2File = new BasisModule.KTX2File(new Uint8Array(buffer));
            function cleanup() {
                ktx2File.close();
                ktx2File.delete();
            }
            if (!ktx2File.isValid()) {
                cleanup();
                throw new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
            }
            const basisFormat = ktx2File.isUASTC() ? BasisFormat.UASTC_4x4 : BasisFormat.ETC1S;
            const width = ktx2File.getWidth();
            const height = ktx2File.getHeight();
            const layerCount = ktx2File.getLayers() || 1;
            const levelCount = ktx2File.getLevels();
            const faceCount = ktx2File.getFaces();
            const hasAlpha = ktx2File.getHasAlpha();
            const dfdFlags = ktx2File.getDFDFlags();
            const { transcoderFormat, engineFormat } = getTranscoderFormat(basisFormat, width, height, hasAlpha);
            if (!width || !height || !levelCount) {
                cleanup();
                throw new Error("THREE.KTX2Loader:	Invalid texture");
            }
            if (!ktx2File.startTranscoding()) {
                cleanup();
                throw new Error("THREE.KTX2Loader: .startTranscoding failed");
            }
            const faces = [];
            const buffers = [];
            for(let face = 0; face < faceCount; face++){
                const mipmaps = [];
                for(let mip = 0; mip < levelCount; mip++){
                    const layerMips = [];
                    let mipWidth, mipHeight;
                    for(let layer = 0; layer < layerCount; layer++){
                        const levelInfo = ktx2File.getImageLevelInfo(mip, layer, face);
                        if (face === 0 && mip === 0 && layer === 0 && (levelInfo.origWidth % 4 !== 0 || levelInfo.origHeight % 4 !== 0)) {
                            console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions.");
                        }
                        if (levelCount > 1) {
                            mipWidth = levelInfo.origWidth;
                            mipHeight = levelInfo.origHeight;
                        } else {
                            mipWidth = levelInfo.width;
                            mipHeight = levelInfo.height;
                        }
                        const dst = new Uint8Array(ktx2File.getImageTranscodedSizeInBytes(mip, layer, 0, transcoderFormat));
                        const status = ktx2File.transcodeImage(dst, mip, layer, face, transcoderFormat, 0, -1, -1);
                        if (!status) {
                            cleanup();
                            throw new Error("THREE.KTX2Loader: .transcodeImage failed.");
                        }
                        layerMips.push(dst);
                    }
                    const mipData = concat(layerMips);
                    mipmaps.push({
                        data: mipData,
                        width: mipWidth,
                        height: mipHeight
                    });
                    buffers.push(mipData.buffer);
                }
                faces.push({
                    mipmaps,
                    width,
                    height,
                    format: engineFormat
                });
            }
            cleanup();
            return {
                faces,
                buffers,
                width,
                height,
                hasAlpha,
                format: engineFormat,
                dfdFlags
            };
        }
        const FORMAT_OPTIONS = [
            {
                if: "astcSupported",
                basisFormat: [
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ASTC_4x4,
                    TranscoderFormat.ASTC_4x4
                ],
                engineFormat: [
                    EngineFormat.RGBA_ASTC_4x4_Format,
                    EngineFormat.RGBA_ASTC_4x4_Format
                ],
                priorityETC1S: Infinity,
                priorityUASTC: 1,
                needsPowerOfTwo: false
            },
            {
                if: "bptcSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.BC7_M5,
                    TranscoderFormat.BC7_M5
                ],
                engineFormat: [
                    EngineFormat.RGBA_BPTC_Format,
                    EngineFormat.RGBA_BPTC_Format
                ],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: false
            },
            {
                if: "dxtSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.BC1,
                    TranscoderFormat.BC3
                ],
                engineFormat: [
                    EngineFormat.RGB_S3TC_DXT1_Format,
                    EngineFormat.RGBA_S3TC_DXT5_Format
                ],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: false
            },
            {
                if: "etc2Supported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ETC1,
                    TranscoderFormat.ETC2
                ],
                engineFormat: [
                    EngineFormat.RGB_ETC2_Format,
                    EngineFormat.RGBA_ETC2_EAC_Format
                ],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: false
            },
            {
                if: "etc1Supported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.ETC1
                ],
                engineFormat: [
                    EngineFormat.RGB_ETC1_Format
                ],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: false
            },
            {
                if: "pvrtcSupported",
                basisFormat: [
                    BasisFormat.ETC1S,
                    BasisFormat.UASTC_4x4
                ],
                transcoderFormat: [
                    TranscoderFormat.PVRTC1_4_RGB,
                    TranscoderFormat.PVRTC1_4_RGBA
                ],
                engineFormat: [
                    EngineFormat.RGB_PVRTC_4BPPV1_Format,
                    EngineFormat.RGBA_PVRTC_4BPPV1_Format
                ],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: true
            }
        ];
        const ETC1S_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
            return a.priorityETC1S - b.priorityETC1S;
        });
        const UASTC_OPTIONS = FORMAT_OPTIONS.sort(function(a, b) {
            return a.priorityUASTC - b.priorityUASTC;
        });
        function getTranscoderFormat(basisFormat, width, height, hasAlpha) {
            let transcoderFormat;
            let engineFormat;
            const options = basisFormat === BasisFormat.ETC1S ? ETC1S_OPTIONS : UASTC_OPTIONS;
            for(let i = 0; i < options.length; i++){
                const opt = options[i];
                if (!config[opt.if]) continue;
                if (!opt.basisFormat.includes(basisFormat)) continue;
                if (hasAlpha && opt.transcoderFormat.length < 2) continue;
                if (opt.needsPowerOfTwo && !(isPowerOfTwo(width) && isPowerOfTwo(height))) continue;
                transcoderFormat = opt.transcoderFormat[hasAlpha ? 1 : 0];
                engineFormat = opt.engineFormat[hasAlpha ? 1 : 0];
                return {
                    transcoderFormat,
                    engineFormat
                };
            }
            console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32.");
            transcoderFormat = TranscoderFormat.RGBA32;
            engineFormat = EngineFormat.RGBAFormat;
            return {
                transcoderFormat,
                engineFormat
            };
        }
        function isPowerOfTwo(value) {
            if (value <= 2) return true;
            return (value & value - 1) === 0 && value !== 0;
        }
        function concat(arrays) {
            if (arrays.length === 1) return arrays[0];
            let totalByteLength = 0;
            for(let i = 0; i < arrays.length; i++){
                const array = arrays[i];
                totalByteLength += array.byteLength;
            }
            const result = new Uint8Array(totalByteLength);
            let byteOffset = 0;
            for(let i = 0; i < arrays.length; i++){
                const array = arrays[i];
                result.set(array, byteOffset);
                byteOffset += array.byteLength;
            }
            return result;
        }
    });
    return KTX2Loader2;
})();
const UNCOMPRESSED_FORMATS = /* @__PURE__ */ new Set([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGFormat"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"]
]);
const FORMAT_MAP = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32B32A32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16B16A16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedFormat"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_SRGB_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_ASTC_6x6_Format"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_UNORM_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBA_ASTC_6x6_Format"]
};
const TYPE_MAP = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32B32A32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16B16A16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8B8A8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32G32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16G16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8G8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R32_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R16_SFLOAT"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_SRGB"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_R8_UNORM"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_SRGB_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VK_FORMAT_ASTC_6x6_UNORM_BLOCK"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsignedByteType"]
};
async function createRawTexture(container) {
    const { vkFormat } = container;
    if (FORMAT_MAP[vkFormat] === void 0) {
        throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
    }
    let zstd;
    if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_ZSTD"]) {
        if (!_zstd) {
            _zstd = new Promise(async (resolve)=>{
                const zstd2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$zstddec$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZSTDDecoder"]();
                await zstd2.init();
                resolve(zstd2);
            });
        }
        zstd = await _zstd;
    }
    const mipmaps = [];
    for(let levelIndex = 0; levelIndex < container.levels.length; levelIndex++){
        const levelWidth = Math.max(1, container.pixelWidth >> levelIndex);
        const levelHeight = Math.max(1, container.pixelHeight >> levelIndex);
        const levelDepth = container.pixelDepth ? Math.max(1, container.pixelDepth >> levelIndex) : 0;
        const level = container.levels[levelIndex];
        let levelData;
        if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_NONE"]) {
            levelData = level.levelData;
        } else if (container.supercompressionScheme === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_SUPERCOMPRESSION_ZSTD"]) {
            levelData = zstd.decode(level.levelData, level.uncompressedByteLength);
        } else {
            throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
        }
        let data;
        if (TYPE_MAP[vkFormat] === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]) {
            data = new Float32Array(levelData.buffer, levelData.byteOffset, levelData.byteLength / Float32Array.BYTES_PER_ELEMENT);
        } else if (TYPE_MAP[vkFormat] === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HalfFloatType"]) {
            data = new Uint16Array(levelData.buffer, levelData.byteOffset, levelData.byteLength / Uint16Array.BYTES_PER_ELEMENT);
        } else {
            data = levelData;
        }
        mipmaps.push({
            data,
            width: levelWidth,
            height: levelHeight,
            depth: levelDepth
        });
    }
    let texture;
    if (UNCOMPRESSED_FORMATS.has(FORMAT_MAP[vkFormat])) {
        texture = container.pixelDepth === 0 ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTexture"](mipmaps[0].data, container.pixelWidth, container.pixelHeight) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$Data3DTexture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Data3DTexture"](mipmaps[0].data, container.pixelWidth, container.pixelHeight, container.pixelDepth);
    } else {
        if (container.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
        texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompressedTexture"](mipmaps, container.pixelWidth, container.pixelHeight);
    }
    texture.mipmaps = mipmaps;
    texture.type = TYPE_MAP[vkFormat];
    texture.format = FORMAT_MAP[vkFormat];
    texture.needsUpdate = true;
    const colorSpace = parseColorSpace(container);
    if ("colorSpace" in texture) texture.colorSpace = colorSpace;
    else texture.encoding = colorSpace === SRGBColorSpace ? sRGBEncoding : LinearEncoding;
    return Promise.resolve(texture);
}
function parseColorSpace(container) {
    const dfd = container.dataFormatDescriptor[0];
    if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_BT709"]) {
        return dfd.transferFunction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_TRANSFER_SRGB"] ? SRGBColorSpace : LinearSRGBColorSpace;
    } else if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_DISPLAYP3"]) {
        return dfd.transferFunction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_TRANSFER_SRGB"] ? DisplayP3ColorSpace : LinearDisplayP3ColorSpace;
    } else if (dfd.colorPrimaries === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$libs$2f$ktx$2d$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KHR_DF_PRIMARIES_UNSPECIFIED"]) {
        return NoColorSpace;
    } else {
        console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${dfd.colorPrimaries}"`);
        return NoColorSpace;
    }
}
;
 //# sourceMappingURL=KTX2Loader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/modifiers/CurveModifier.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flow",
    ()=>Flow,
    "InstancedFlow",
    ()=>InstancedFlow,
    "getUniforms",
    ()=>getUniforms,
    "initSplineTexture",
    ()=>initSplineTexture,
    "modifyShader",
    ()=>modifyShader,
    "updateSplineTexture",
    ()=>updateSplineTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
const CHANNELS = 4;
const TEXTURE_WIDTH = 1024;
const TEXTURE_HEIGHT = 4;
const initSplineTexture = (numberOfCurves = 1)=>{
    const dataArray = new Float32Array(TEXTURE_WIDTH * TEXTURE_HEIGHT * numberOfCurves * CHANNELS);
    const dataTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTexture"](dataArray, TEXTURE_WIDTH, TEXTURE_HEIGHT * numberOfCurves, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RGBAFormat"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatType"]);
    dataTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    dataTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    dataTexture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NearestFilter"];
    dataTexture.needsUpdate = true;
    return dataTexture;
};
const updateSplineTexture = (texture, splineCurve, offset = 0)=>{
    const numberOfPoints = Math.floor(TEXTURE_WIDTH * (TEXTURE_HEIGHT / 4));
    splineCurve.arcLengthDivisions = numberOfPoints / 2;
    splineCurve.updateArcLengths();
    const points = splineCurve.getSpacedPoints(numberOfPoints);
    const frenetFrames = splineCurve.computeFrenetFrames(numberOfPoints, true);
    for(let i = 0; i < numberOfPoints; i++){
        const rowOffset = Math.floor(i / TEXTURE_WIDTH);
        const rowIndex = i % TEXTURE_WIDTH;
        let pt = points[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 0 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.tangents[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 1 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.normals[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 2 + rowOffset + TEXTURE_HEIGHT * offset);
        pt = frenetFrames.binormals[i];
        setTextureValue(texture, rowIndex, pt.x, pt.y, pt.z, 3 + rowOffset + TEXTURE_HEIGHT * offset);
    }
    texture.needsUpdate = true;
};
const setTextureValue = (texture, index, x, y, z, o)=>{
    const image = texture.image;
    const { data } = image;
    const i = CHANNELS * TEXTURE_WIDTH * o;
    data[index * CHANNELS + i + 0] = x;
    data[index * CHANNELS + i + 1] = y;
    data[index * CHANNELS + i + 2] = z;
    data[index * CHANNELS + i + 3] = 1;
};
const getUniforms = (splineTexture)=>({
        spineTexture: {
            value: splineTexture
        },
        pathOffset: {
            type: "f",
            value: 0
        },
        // time of path curve
        pathSegment: {
            type: "f",
            value: 1
        },
        // fractional length of path
        spineOffset: {
            type: "f",
            value: 161
        },
        spineLength: {
            type: "f",
            value: 400
        },
        flow: {
            type: "i",
            value: 1
        }
    });
function modifyShader(material, uniforms, numberOfCurves = 1) {
    if (material.__ok) return;
    material.__ok = true;
    material.onBeforeCompile = (shader)=>{
        if (shader.__modified) return;
        shader.__modified = true;
        Object.assign(shader.uniforms, uniforms);
        const vertexShader = /* glsl */ `
		uniform sampler2D spineTexture;
		uniform float pathOffset;
		uniform float pathSegment;
		uniform float spineOffset;
		uniform float spineLength;
		uniform int flow;

		float textureLayers = ${TEXTURE_HEIGHT * numberOfCurves}.;
		float textureStacks = ${TEXTURE_HEIGHT / 4}.;

		${shader.vertexShader}
		`.replace("#include <beginnormal_vertex>", "").replace("#include <defaultnormal_vertex>", "").replace("#include <begin_vertex>", "").replace(/void\s*main\s*\(\)\s*\{/, /* glsl */ `
        void main() {
        #include <beginnormal_vertex>

        vec4 worldPos = modelMatrix * vec4(position, 1.);

        bool bend = flow > 0;
        float xWeight = bend ? 0. : 1.;

        #ifdef USE_INSTANCING
        float pathOffsetFromInstanceMatrix = instanceMatrix[3][2];
        float spineLengthFromInstanceMatrix = instanceMatrix[3][0];
        float spinePortion = bend ? (worldPos.x + spineOffset) / spineLengthFromInstanceMatrix : 0.;
        float mt = (spinePortion * pathSegment + pathOffset + pathOffsetFromInstanceMatrix)*textureStacks;
        #else
        float spinePortion = bend ? (worldPos.x + spineOffset) / spineLength : 0.;
        float mt = (spinePortion * pathSegment + pathOffset)*textureStacks;
        #endif

        mt = mod(mt, textureStacks);
        float rowOffset = floor(mt);

        #ifdef USE_INSTANCING
        rowOffset += instanceMatrix[3][1] * ${TEXTURE_HEIGHT}.;
        #endif

        vec3 spinePos = texture2D(spineTexture, vec2(mt, (0. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 a =        texture2D(spineTexture, vec2(mt, (1. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 b =        texture2D(spineTexture, vec2(mt, (2. + rowOffset + 0.5) / textureLayers)).xyz;
        vec3 c =        texture2D(spineTexture, vec2(mt, (3. + rowOffset + 0.5) / textureLayers)).xyz;
        mat3 basis = mat3(a, b, c);

        vec3 transformed = basis
          * vec3(worldPos.x * xWeight, worldPos.y * 1., worldPos.z * 1.)
          + spinePos;

        vec3 transformedNormal = normalMatrix * (basis * objectNormal);
			`).replace("#include <project_vertex>", /* glsl */ `vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
				gl_Position = projectionMatrix * mvPosition;`);
        shader.vertexShader = vertexShader;
    };
}
class Flow {
    /**
   * @param {Mesh} mesh The mesh to clone and modify to bend around the curve
   * @param {number} numberOfCurves The amount of space that should preallocated for additional curves
   */ constructor(mesh, numberOfCurves = 1){
        __publicField(this, "curveArray");
        __publicField(this, "curveLengthArray");
        __publicField(this, "object3D");
        __publicField(this, "splineTexure");
        __publicField(this, "uniforms");
        const obj3D = mesh.clone();
        const splineTexure = initSplineTexture(numberOfCurves);
        const uniforms = getUniforms(splineTexure);
        obj3D.traverse((child)=>{
            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] || child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"]) {
                child.material = child.material.clone();
                modifyShader(child.material, uniforms, numberOfCurves);
            }
        });
        this.curveArray = new Array(numberOfCurves);
        this.curveLengthArray = new Array(numberOfCurves);
        this.object3D = obj3D;
        this.splineTexure = splineTexure;
        this.uniforms = uniforms;
    }
    updateCurve(index, curve) {
        if (index >= this.curveArray.length) throw Error("Index out of range for Flow");
        const curveLength = curve.getLength();
        this.uniforms.spineLength.value = curveLength;
        this.curveLengthArray[index] = curveLength;
        this.curveArray[index] = curve;
        updateSplineTexture(this.splineTexure, curve, index);
    }
    moveAlongCurve(amount) {
        this.uniforms.pathOffset.value += amount;
    }
}
const matrix = /* @__PURE__ */ new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
class InstancedFlow extends Flow {
    /**
   *
   * @param {number} count The number of instanced elements
   * @param {number} curveCount The number of curves to preallocate for
   * @param {Geometry} geometry The geometry to use for the instanced mesh
   * @param {Material} material The material to use for the instanced mesh
   */ constructor(count, curveCount, geometry, material){
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geometry, material, count);
        mesh.instanceMatrix.setUsage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DynamicDrawUsage"]);
        mesh.frustumCulled = false;
        super(mesh, curveCount);
        __publicField(this, "offsets");
        __publicField(this, "whichCurve");
        this.offsets = new Array(count).fill(0);
        this.whichCurve = new Array(count).fill(0);
    }
    /**
   * The extra information about which curve and curve position is stored in the translation components of the matrix for the instanced objects
   * This writes that information to the matrix and marks it as needing update.
   *
   * @param {number} index of the instanced element to update
   */ writeChanges(index) {
        matrix.makeTranslation(this.curveLengthArray[this.whichCurve[index]], this.whichCurve[index], this.offsets[index]);
        this.object3D.setMatrixAt(index, matrix);
        this.object3D.instanceMatrix.needsUpdate = true;
    }
    /**
   * Move an individual element along the curve by a specific amount
   *
   * @param {number} index Which element to update
   * @param {number} offset Move by how much
   */ moveIndividualAlongCurve(index, offset) {
        this.offsets[index] += offset;
        this.writeChanges(index);
    }
    /**
   * Select which curve to use for an element
   *
   * @param {number} index the index of the instanced element to update
   * @param {number} curveNo the index of the curve it should use
   */ setCurve(index, curveNo) {
        if (isNaN(curveNo)) throw Error("curve index being set is Not a Number (NaN)");
        this.whichCurve[index] = curveNo;
        this.writeChanges(index);
    }
}
;
 //# sourceMappingURL=CurveModifier.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/math/SimplexNoise.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SimplexNoise",
    ()=>SimplexNoise
]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
class SimplexNoise {
    /**
   * You can pass in a random number generator object if you like.
   * It is assumed to have a random() method.
   */ constructor(r = Math){
        __publicField(this, "grad3", [
            [
                1,
                1,
                0
            ],
            [
                -1,
                1,
                0
            ],
            [
                1,
                -1,
                0
            ],
            [
                -1,
                -1,
                0
            ],
            [
                1,
                0,
                1
            ],
            [
                -1,
                0,
                1
            ],
            [
                1,
                0,
                -1
            ],
            [
                -1,
                0,
                -1
            ],
            [
                0,
                1,
                1
            ],
            [
                0,
                -1,
                1
            ],
            [
                0,
                1,
                -1
            ],
            [
                0,
                -1,
                -1
            ]
        ]);
        __publicField(this, "grad4", [
            [
                0,
                1,
                1,
                1
            ],
            [
                0,
                1,
                1,
                -1
            ],
            [
                0,
                1,
                -1,
                1
            ],
            [
                0,
                1,
                -1,
                -1
            ],
            [
                0,
                -1,
                1,
                1
            ],
            [
                0,
                -1,
                1,
                -1
            ],
            [
                0,
                -1,
                -1,
                1
            ],
            [
                0,
                -1,
                -1,
                -1
            ],
            [
                1,
                0,
                1,
                1
            ],
            [
                1,
                0,
                1,
                -1
            ],
            [
                1,
                0,
                -1,
                1
            ],
            [
                1,
                0,
                -1,
                -1
            ],
            [
                -1,
                0,
                1,
                1
            ],
            [
                -1,
                0,
                1,
                -1
            ],
            [
                -1,
                0,
                -1,
                1
            ],
            [
                -1,
                0,
                -1,
                -1
            ],
            [
                1,
                1,
                0,
                1
            ],
            [
                1,
                1,
                0,
                -1
            ],
            [
                1,
                -1,
                0,
                1
            ],
            [
                1,
                -1,
                0,
                -1
            ],
            [
                -1,
                1,
                0,
                1
            ],
            [
                -1,
                1,
                0,
                -1
            ],
            [
                -1,
                -1,
                0,
                1
            ],
            [
                -1,
                -1,
                0,
                -1
            ],
            [
                1,
                1,
                1,
                0
            ],
            [
                1,
                1,
                -1,
                0
            ],
            [
                1,
                -1,
                1,
                0
            ],
            [
                1,
                -1,
                -1,
                0
            ],
            [
                -1,
                1,
                1,
                0
            ],
            [
                -1,
                1,
                -1,
                0
            ],
            [
                -1,
                -1,
                1,
                0
            ],
            [
                -1,
                -1,
                -1,
                0
            ]
        ]);
        __publicField(this, "p", []);
        // To remove the need for index wrapping, double the permutation table length
        __publicField(this, "perm", []);
        // A lookup table to traverse the simplex around a given point in 4D.
        // Details can be found where this table is used, in the 4D noise method.
        __publicField(this, "simplex", [
            [
                0,
                1,
                2,
                3
            ],
            [
                0,
                1,
                3,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                2,
                3,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                2,
                3,
                0
            ],
            [
                0,
                2,
                1,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                3,
                1,
                2
            ],
            [
                0,
                3,
                2,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                3,
                2,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                2,
                0,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                3,
                0,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                3,
                0,
                1
            ],
            [
                2,
                3,
                1,
                0
            ],
            [
                1,
                0,
                2,
                3
            ],
            [
                1,
                0,
                3,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                0,
                3,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                1,
                3,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                2,
                0,
                1,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                0,
                1,
                2
            ],
            [
                3,
                0,
                2,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                1,
                2,
                0
            ],
            [
                2,
                1,
                0,
                3
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                1,
                0,
                2
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                3,
                2,
                0,
                1
            ],
            [
                3,
                2,
                1,
                0
            ]
        ]);
        __publicField(this, "dot", (g, x, y)=>{
            return g[0] * x + g[1] * y;
        });
        __publicField(this, "dot3", (g, x, y, z)=>{
            return g[0] * x + g[1] * y + g[2] * z;
        });
        __publicField(this, "dot4", (g, x, y, z, w)=>{
            return g[0] * x + g[1] * y + g[2] * z + g[3] * w;
        });
        __publicField(this, "noise", (xin, yin)=>{
            let n0;
            let n1;
            let n2;
            const F2 = 0.5 * (Math.sqrt(3) - 1);
            const s = (xin + yin) * F2;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const G2 = (3 - Math.sqrt(3)) / 6;
            const t = (i + j) * G2;
            const X0 = i - t;
            const Y0 = j - t;
            const x0 = xin - X0;
            const y0 = yin - Y0;
            let i1 = 0;
            let j1 = 1;
            if (x0 > y0) {
                i1 = 1;
                j1 = 0;
            }
            const x1 = x0 - i1 + G2;
            const y1 = y0 - j1 + G2;
            const x2 = x0 - 1 + 2 * G2;
            const y2 = y0 - 1 + 2 * G2;
            const ii = i & 255;
            const jj = j & 255;
            const gi0 = this.perm[ii + this.perm[jj]] % 12;
            const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12;
            const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12;
            let t0 = 0.5 - x0 * x0 - y0 * y0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
            }
            let t1 = 0.5 - x1 * x1 - y1 * y1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
            }
            let t2 = 0.5 - x2 * x2 - y2 * y2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
            }
            return 70 * (n0 + n1 + n2);
        });
        // 3D simplex noise
        __publicField(this, "noise3d", (xin, yin, zin)=>{
            let n0;
            let n1;
            let n2;
            let n3;
            const F3 = 1 / 3;
            const s = (xin + yin + zin) * F3;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const k = Math.floor(zin + s);
            const G3 = 1 / 6;
            const t = (i + j + k) * G3;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;
            const x0 = xin - X0;
            const y0 = yin - Y0;
            const z0 = zin - Z0;
            let i1;
            let j1;
            let k1;
            let i2;
            let j2;
            let k2;
            if (x0 >= y0) {
                if (y0 >= z0) {
                    i1 = 1;
                    j1 = 0;
                    k1 = 0;
                    i2 = 1;
                    j2 = 1;
                    k2 = 0;
                } else if (x0 >= z0) {
                    i1 = 1;
                    j1 = 0;
                    k1 = 0;
                    i2 = 1;
                    j2 = 0;
                    k2 = 1;
                } else {
                    i1 = 0;
                    j1 = 0;
                    k1 = 1;
                    i2 = 1;
                    j2 = 0;
                    k2 = 1;
                }
            } else {
                if (y0 < z0) {
                    i1 = 0;
                    j1 = 0;
                    k1 = 1;
                    i2 = 0;
                    j2 = 1;
                    k2 = 1;
                } else if (x0 < z0) {
                    i1 = 0;
                    j1 = 1;
                    k1 = 0;
                    i2 = 0;
                    j2 = 1;
                    k2 = 1;
                } else {
                    i1 = 0;
                    j1 = 1;
                    k1 = 0;
                    i2 = 1;
                    j2 = 1;
                    k2 = 0;
                }
            }
            const x1 = x0 - i1 + G3;
            const y1 = y0 - j1 + G3;
            const z1 = z0 - k1 + G3;
            const x2 = x0 - i2 + 2 * G3;
            const y2 = y0 - j2 + 2 * G3;
            const z2 = z0 - k2 + 2 * G3;
            const x3 = x0 - 1 + 3 * G3;
            const y3 = y0 - 1 + 3 * G3;
            const z3 = z0 - 1 + 3 * G3;
            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;
            const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
            const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
            const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
            const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot3(this.grad3[gi0], x0, y0, z0);
            }
            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot3(this.grad3[gi1], x1, y1, z1);
            }
            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot3(this.grad3[gi2], x2, y2, z2);
            }
            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
            if (t3 < 0) {
                n3 = 0;
            } else {
                t3 *= t3;
                n3 = t3 * t3 * this.dot3(this.grad3[gi3], x3, y3, z3);
            }
            return 32 * (n0 + n1 + n2 + n3);
        });
        // 4D simplex noise
        __publicField(this, "noise4d", (x, y, z, w)=>{
            const grad4 = this.grad4;
            const simplex = this.simplex;
            const perm = this.perm;
            const F4 = (Math.sqrt(5) - 1) / 4;
            const G4 = (5 - Math.sqrt(5)) / 20;
            let n0;
            let n1;
            let n2;
            let n3;
            let n4;
            const s = (x + y + z + w) * F4;
            const i = Math.floor(x + s);
            const j = Math.floor(y + s);
            const k = Math.floor(z + s);
            const l = Math.floor(w + s);
            const t = (i + j + k + l) * G4;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;
            const W0 = l - t;
            const x0 = x - X0;
            const y0 = y - Y0;
            const z0 = z - Z0;
            const w0 = w - W0;
            const c1 = x0 > y0 ? 32 : 0;
            const c2 = x0 > z0 ? 16 : 0;
            const c3 = y0 > z0 ? 8 : 0;
            const c4 = x0 > w0 ? 4 : 0;
            const c5 = y0 > w0 ? 2 : 0;
            const c6 = z0 > w0 ? 1 : 0;
            const c = c1 + c2 + c3 + c4 + c5 + c6;
            let i1;
            let j1;
            let k1;
            let l1;
            let i2;
            let j2;
            let k2;
            let l2;
            let i3;
            let j3;
            let k3;
            let l3;
            i1 = simplex[c][0] >= 3 ? 1 : 0;
            j1 = simplex[c][1] >= 3 ? 1 : 0;
            k1 = simplex[c][2] >= 3 ? 1 : 0;
            l1 = simplex[c][3] >= 3 ? 1 : 0;
            i2 = simplex[c][0] >= 2 ? 1 : 0;
            j2 = simplex[c][1] >= 2 ? 1 : 0;
            k2 = simplex[c][2] >= 2 ? 1 : 0;
            l2 = simplex[c][3] >= 2 ? 1 : 0;
            i3 = simplex[c][0] >= 1 ? 1 : 0;
            j3 = simplex[c][1] >= 1 ? 1 : 0;
            k3 = simplex[c][2] >= 1 ? 1 : 0;
            l3 = simplex[c][3] >= 1 ? 1 : 0;
            const x1 = x0 - i1 + G4;
            const y1 = y0 - j1 + G4;
            const z1 = z0 - k1 + G4;
            const w1 = w0 - l1 + G4;
            const x2 = x0 - i2 + 2 * G4;
            const y2 = y0 - j2 + 2 * G4;
            const z2 = z0 - k2 + 2 * G4;
            const w2 = w0 - l2 + 2 * G4;
            const x3 = x0 - i3 + 3 * G4;
            const y3 = y0 - j3 + 3 * G4;
            const z3 = z0 - k3 + 3 * G4;
            const w3 = w0 - l3 + 3 * G4;
            const x4 = x0 - 1 + 4 * G4;
            const y4 = y0 - 1 + 4 * G4;
            const z4 = z0 - 1 + 4 * G4;
            const w4 = w0 - 1 + 4 * G4;
            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;
            const ll = l & 255;
            const gi0 = perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32;
            const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32;
            const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32;
            const gi3 = perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32;
            const gi4 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32;
            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
            if (t0 < 0) {
                n0 = 0;
            } else {
                t0 *= t0;
                n0 = t0 * t0 * this.dot4(grad4[gi0], x0, y0, z0, w0);
            }
            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
            if (t1 < 0) {
                n1 = 0;
            } else {
                t1 *= t1;
                n1 = t1 * t1 * this.dot4(grad4[gi1], x1, y1, z1, w1);
            }
            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
            if (t2 < 0) {
                n2 = 0;
            } else {
                t2 *= t2;
                n2 = t2 * t2 * this.dot4(grad4[gi2], x2, y2, z2, w2);
            }
            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
            if (t3 < 0) {
                n3 = 0;
            } else {
                t3 *= t3;
                n3 = t3 * t3 * this.dot4(grad4[gi3], x3, y3, z3, w3);
            }
            let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
            if (t4 < 0) {
                n4 = 0;
            } else {
                t4 *= t4;
                n4 = t4 * t4 * this.dot4(grad4[gi4], x4, y4, z4, w4);
            }
            return 27 * (n0 + n1 + n2 + n3 + n4);
        });
        for(let i = 0; i < 256; i++){
            this.p[i] = Math.floor(r.random() * 256);
        }
        for(let i = 0; i < 512; i++){
            this.perm[i] = this.p[i & 255];
        }
    }
}
;
 //# sourceMappingURL=SimplexNoise.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/shaders/HorizontalBlurShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HorizontalBlurShader",
    ()=>HorizontalBlurShader
]);
const HorizontalBlurShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        h: {
            value: 1 / 512
        }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,
    fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `
};
;
 //# sourceMappingURL=HorizontalBlurShader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/shaders/VerticalBlurShader.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VerticalBlurShader",
    ()=>VerticalBlurShader
]);
const VerticalBlurShader = {
    uniforms: {
        tDiffuse: {
            value: null
        },
        v: {
            value: 1 / 512
        }
    },
    vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
    fragmentShader: /* glsl */ `

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `
};
;
 //# sourceMappingURL=VerticalBlurShader.js.map
}),
"[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/objects/Sky.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sky",
    ()=>Sky
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three@0.181.2/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/three-stdlib@2.36.1_three@0.181.2/node_modules/three-stdlib/_polyfill/constants.js [app-client] (ecmascript)");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
;
;
const Sky = /* @__PURE__ */ (()=>{
    const SkyShader = {
        uniforms: {
            turbidity: {
                value: 2
            },
            rayleigh: {
                value: 1
            },
            mieCoefficient: {
                value: 5e-3
            },
            mieDirectionalG: {
                value: 0.8
            },
            sunPosition: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
            },
            up: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)
            }
        },
        vertexShader: /* glsl */ `
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,
        fragmentShader: /* glsl */ `
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$2d$stdlib$40$2$2e$36$2e$1_three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2d$stdlib$2f$_polyfill$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"] >= 154 ? "colorspace_fragment" : "encodings_fragment"}>

      }
    `
    };
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        name: "SkyShader",
        fragmentShader: SkyShader.fragmentShader,
        vertexShader: SkyShader.vertexShader,
        uniforms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(SkyShader.uniforms),
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"],
        depthWrite: false
    });
    class Sky2 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"] {
        constructor(){
            super(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$three$40$0$2e$181$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1), material);
        }
    }
    __publicField(Sky2, "SkyShader", SkyShader);
    __publicField(Sky2, "material", material);
    return Sky2;
})();
;
 //# sourceMappingURL=Sky.js.map
}),
]);

//# sourceMappingURL=0720a_three-stdlib_efba3276._.js.map