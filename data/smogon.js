'use strict';

let metagame = "sm"
let api = "http://www.smogon.com/dex/_rpc/dump-"

let endpoints = ["ability", "item", "move", "pokemon"]

function aliasSanitize(alias){
  return alias.replace(/ /g,"_")
}

exports.SmogonAbilities = (client, ability, callback) => {
  let options = {
  gen: metagame,
  alias: ability
  }
  
  let endpoint = api + endpoints[0]
  client.request.post(endpoint, {body:options,json:true}, (error, response, body)=>{
    if(!error && body != null){
      callback(body)
    }else{
    callback({error:"Request not found"})
    }
  });
}

exports.SmogonItems = (client, item, callback) => {
  let options = {
  gen: metagame,
  alias: item
  }
  
  let endpoint = api + endpoints[1]
  client.request.post(endpoint, {body:options,json:true}, (error, response, body)=>{
    if(!error && body != null){
      callback(body)
    }else{
    callback({error:"Request not found"})
    }
  });
}

exports.SmogonMoves = (client, move, callback) => {
  let options = {
  gen: metagame,
  alias: move
  }
  
  let endpoint = api + endpoints[2]
  client.request.post(endpoint, {body:options,json:true}, (error, response, body)=>{
    if(!error && body != null){
      callback(body)
    }else{
    callback({error:"Request not found"})
    }
  });
}

exports.SmogonPokemons = (client, pokemon, callback) => {
  let options = {
  gen: metagame,
  alias: pokemon
  }
  
  let endpoint = api + endpoints[3]
  client.request.post(endpoint, {body:options,json:true}, (error, response, body)=>{
    if(!error && body != null){
      callback(body)
    }else{
    callback({error:"Request not found"})
    }
  });
}