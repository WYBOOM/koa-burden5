/*
 * @Description: 
 * @Author: huacong
 * @Date: 2020-06-22 18:20:59
 * @LastEditTime: 2020-06-23 08:52:17
 * @LastEditors: huacong
 */ 
const http = require('http')
const query = require('../util/http')


//获取赛事列表
const getList = async (ctx) => {
  const res = await query('get', '/league/list',ctx.originalUrl)
  ctx.response.body = res
}
// 获取赛事详情
const getInfo = async (ctx) => {
  const res = await query('get', '/league/detail',ctx.originalUrl)
  ctx.response.body = res
}
// 获取赛事队伍列表
const getInfo1 = async (ctx) => {
  const res = await query('get', '/league/join/team/list',ctx.originalUrl)
  ctx.response.body = res
}

const getInfo2 = async (ctx) => {
  const res = await query('get', '/league/team-vs-team/match-history',ctx.originalUrl)
  ctx.response.body = res
}



module.exports = {
  'GET /get_match_list': getList,
  'GET /get_match_info': getInfo,
  'GET /get_join_match_team_list': getInfo1,
  'GET /get_join_match_team_list123': getInfo2,
}
