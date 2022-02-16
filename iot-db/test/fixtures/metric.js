'use strict'

const agentFixtures = require('./agent')
const utils = require('../../utils')

const extend = utils.extend

const metric = {
  id: 1,
  agent_id: 1,
  type: 'temperatura',
  value: '30.00',
  created_at: new Date(),
  agent: agentFixtures.findById(1)
}

const metrics = [
  metric,
  extend(metric, { id: 2, value: '28.5' }),
  extend(metric, { id: 3, value: '26.0' }),
  extend(metric, { id: 4, agent_id: 2, type: 'temperatura', value: '33.0', agent: agentFixtures.findById(2) })
]

function findByAgentUuid (uuid) {
  return metrics.filter(m => m.agent ? m.agent.uuid === uuid : false).map(m => {
    const clone = Object.assign({}, m)

    delete clone.agent

    return clone
  })
}

function findByTypeAgentUuid (type, uuid) {
  return metrics.filter(m => m.type === type && (m.agent ? m.agent.uuid === uuid : false)).map(m => {
    const clone = Object.assign({}, m)

    delete clone.agent_id
    delete clone.agent

    return clone
  }).sort(utils.sortBy('created_at')).reverse()
}

module.exports = {
  all: metrics,
  findByAgentUuid,
  findByTypeAgentUuid
}