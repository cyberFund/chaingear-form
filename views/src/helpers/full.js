/* eslint-disable */
module.exports = (formData, noIco) => {
  console.log(formData.roadmap)
  if (noIco === false) {
  formData.phases.phases = formData.phases.phases.filter(phase => phase !== null)
  const full = {
  "blockchain": {
    "project_name": formData.blockchain.project_name,
    "headline": formData.blockchain.headline,
    "short_description": formData.blockchain.text,
    "logo": "",
    "state": formData.blockchain.state,
    "asset_type": formData.blockchain.asset_type,
    "dependency": formData.blockchain.dependency,
    "consensus_name": formData.blockchain.consensus,
    "links": formData.links,
    "milestone": formData.roadmap.milestones
  },
  "ico": {
    "common_info": {
      "is_ico": true,
      "current_ico_phase": formData.phases.phases.length - 1,
      "current_phase_status": formData.ico.phase_status,
      "token_distribution": {
        "total_supply": formData.ico.supply || 0,
        "shares": (formData.ico.distr.length !== 0) ? formData.ico.distr
          : [{description: '', percent: 0}]
      },
      "use_of_proceeds": (formData.ico.proceeds.length !== 0) ? formData.ico.proceeds
        : [{description: '', percent: 0}]
    },
    "phases": formData.phases.phases
  },
  "app": {
    "info": formData.apps
  },
  "token": formData.tokens,
  "exchange": [
    {
      "exchange": "",
      "date": "",
      "price": "",
      "volume": ""
    }
  ],
  "label": [
    {
      "blockchain": "",
      "address": "",
      "balance": ""
    }
  ]
}

full.ico.phases = full.ico.phases.filter(phase => phase !== null).map((phase, i) => {
  phase.terms.sales_agreement = formData.ico.sales_agreement
  phase.terms.sales_url = formData.ico.sales_url
  phase.phase_num  = i
  return phase
})
return full
} else {
  const full = {
  "blockchain": {
    "project_name": formData.blockchain.project_name,
    "headline": formData.blockchain.headline,
    "short_description": formData.blockchain.text,
    "logo": "",
    "asset_type": formData.blockchain.asset_type,
    "dependency": formData.blockchain.dependency,
    "consensus_name": formData.blockchain.consensus,
    "links": formData.links,
    "milestone": formData.roadmap.milestones
  },
  "ico": {
    is_ico: false
  },
  "app": {
    "info": formData.apps
  },
  "token": formData.tokens,
  "exchange": [
    {
      "exchange": "",
      "date": "",
      "price": "",
      "volume": ""
    }
  ],
  "label": [
    {
      "blockchain": "",
      "address": "",
      "balance": ""
    }
  ]
}
  return full
}
}
