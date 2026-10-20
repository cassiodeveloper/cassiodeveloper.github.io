import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
test('analytics omits free text and sensitive URL parameters and does not configure local previews',()=>{
 const context={URL,location:new URL('http://localhost/cybersecgames/?map-q=private#secret'),document:{referrer:'https://example.com/?email=private',documentElement:{lang:'pt-BR'},addEventListener(){}},dataLayer:[]};context.window=context;
 vm.runInNewContext(fs.readFileSync('cybersecgames/ga-init.js','utf8'),context);
 context.csgTrack('csg_search',{search_active:true,q:'private',filter_value:'active',result_count:3});
 const events=context.dataLayer.map(x=>Array.from(x));
 assert.equal(events.some(x=>x[0]==='config'),false);
 const params=events.at(-1)[2];assert.equal(params.q,undefined);assert.equal(params.page_location,'http://localhost/cybersecgames/');assert.equal(params.page_referrer,'https://example.com/');assert.equal(params.result_count,3);
 const before=events.length;context.csgTrack('unknown',{});assert.equal(context.dataLayer.length,before);
});
