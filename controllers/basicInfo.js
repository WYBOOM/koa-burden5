/*
 * @Description: 
 * @Author: huacong
 * @Date: 2020-06-19 15:02:54
 * @LastEditTime: 2020-06-22 18:19:11
 * @LastEditors: huacong
 */ 
const http = require('http')
const query = require('../util/http')



const getTeamList = async (ctx) => {
  const res = await query('get', '/league/team',ctx.originalUrl)
  ctx.response.body = res
}
const getTeamInfo = async (ctx) => {
  const res = await query('get', '/league/team/info',ctx.originalUrl)
  ctx.response.body = res
}
const getPlayerList = async (ctx) => {
    const res = await query('get', '/league/player',ctx.originalUrl)
    ctx.response.body = res
}
const getPlayerInfo = async (ctx) => {
    const res = await query('get', '/league/player/info',ctx.originalUrl)
    ctx.response.body = res
}
// 战队下队员的列表
const getTeamWithPlayersList = async (ctx) => {
    const res = await query('get', '/league/team-with-players',ctx.originalUrl)
    ctx.response.body = res
}

const getHeroList = async (ctx) => {
    const res = await query('get', '/raw/hero',ctx.originalUrl)
    ctx.response.body = res
}

const getItemList = async (ctx) => {
    const res = await query('get', '/raw/item',ctx.originalUrl)
    ctx.response.body = res
}



module.exports = {
  'GET /get_team_list': getTeamList,
  'GET /get_team_info': getTeamInfo,
  'GET /get_player_list': getPlayerList,
  'GET /get_player_info': getPlayerInfo,
  'GET /get_team_with_player_list': getTeamWithPlayersList,
  'GET /get_hero_list': getHeroList,
  'GET /get_item_list': getItemList,
}
