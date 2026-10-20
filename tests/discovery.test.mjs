import test from 'node:test';
import assert from 'node:assert/strict';
import {games,useCases,domains,processes,audiences,engagements,defaultState,readState,matchingCases} from '../cybersecgames/discovery-data.js';
test('every verified game has distinct actionable services and valid references',()=>{
 assert.equal(games.length,17);assert.equal(new Set(games.map(g=>g.id)).size,17);
 assert.equal(new Set(useCases.map(u=>u.id)).size,useCases.length);
 for(const g of games){assert.ok(matchingCases({...defaultState,game:g.id}).length>=2);assert.equal(new URL(g.url).hostname,'cybersecgames.com');assert.equal(new URL(g.image).hostname,'cybersecgames.com');}
 for(const u of useCases){for(const id of u.gameIds)assert.ok(games.some(g=>g.id===id));for(const [field,dict] of Object.entries({domains,processes,audiences,engagements}))for(const id of u[field])assert.ok(dict[id],`${field}: ${id}`);assert.ok(u.name.en&&u.name['pt-BR']&&u.deliverable['pt-BR']);}
});
test('filters intersect within one use case, never across unrelated services',()=>{
 assert.equal(matchingCases({...defaultState,game:'eop'}).length,3);
 assert.equal(matchingCases({...defaultState,game:'eop',process:'join',engagement:'assess'}).length,0);
 assert.equal(matchingCases({...defaultState,game:'eop',process:'join',engagement:'learn'}).length,1);
 assert.equal(matchingCases({...defaultState,game:'byte-club',domain:'privacy'}).length,0);
 assert.ok(matchingCases({...defaultState,domain:'ai',audience:'governance',process:'govern'}).length>0);
});
test('search supports both languages and accents',()=>{
 assert.ok(matchingCases({...defaultState,q:'privacidade'}).length>0);
 assert.deepEqual(matchingCases({...defaultState,q:'integração'}),matchingCases({...defaultState,q:'integracao'}));
 assert.ok(matchingCases({...defaultState,q:'threat model'}).length>0);
 assert.equal(matchingCases({...defaultState,q:'no-game-matches-this'}).length,0);
});
test('URL restores filters, ignores unrelated params and validates unknown IDs',()=>{
 const state=readState('?lang=pt-BR&map-mode=game&map-game=eop&map-view=matrix&map-domain=threat&map-process=design');
 assert.equal(state.game,'eop');assert.equal(state.view,'matrix');assert.ok(matchingCases(state).length>0);
 assert.deepEqual(readState('?map-game=bad&map-mode=bad&map-domain=bad'),defaultState);
});
