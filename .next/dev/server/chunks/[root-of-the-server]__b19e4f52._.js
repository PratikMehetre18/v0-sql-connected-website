module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToWatchlist",
    ()=>addToWatchlist,
    "getTrendingVideos",
    ()=>getTrendingVideos,
    "getUserWatchlist",
    ()=>getUserWatchlist,
    "getVideoById",
    ()=>getVideoById,
    "getVideos",
    ()=>getVideos,
    "getVideosByGenre",
    ()=>getVideosByGenre,
    "query",
    ()=>query,
    "removeFromWatchlist",
    ()=>removeFromWatchlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.DATABASE_URL);
async function query(text, params) {
    try {
        const result = await sql.query(text, params);
        return result || [];
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}
async function getVideos(limit = 20, offset = 0) {
    return query(`SELECT * FROM videos ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [
        limit,
        offset
    ]);
}
async function getVideoById(id) {
    const result = await query(`SELECT * FROM videos WHERE id = $1`, [
        id
    ]);
    return result[0] || null;
}
async function getVideosByGenre(genre, limit = 10) {
    return query(`SELECT * FROM videos WHERE genre = $1 ORDER BY rating DESC LIMIT $2`, [
        genre,
        limit
    ]);
}
async function getTrendingVideos(limit = 10) {
    return query(`SELECT * FROM videos ORDER BY view_count DESC, rating DESC LIMIT $1`, [
        limit
    ]);
}
async function getUserWatchlist(userId) {
    return query(`SELECT v.* FROM videos v
     INNER JOIN watchlist w ON v.id = w.video_id
     WHERE w.user_id = $1
     ORDER BY w.added_at DESC`, [
        userId
    ]);
}
async function addToWatchlist(userId, videoId) {
    try {
        return await query(`INSERT INTO watchlist (user_id, video_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`, [
            userId,
            videoId
        ]);
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        throw error;
    }
}
async function removeFromWatchlist(userId, videoId) {
    return query(`DELETE FROM watchlist WHERE user_id = $1 AND video_id = $2`, [
        userId,
        videoId
    ]);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/videos/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = Number.parseInt(searchParams.get("limit") || "20");
        const offset = Number.parseInt(searchParams.get("offset") || "0");
        const genre = searchParams.get("genre");
        let videos;
        if (genre) {
            videos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM movies WHERE genre = $1 ORDER BY rating DESC LIMIT $2 OFFSET $3`, [
                genre,
                limit,
                offset
            ]);
        } else {
            videos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`SELECT * FROM movies ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [
                limit,
                offset
            ]);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(videos);
    } catch (error) {
        console.error("API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch videos"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b19e4f52._.js.map