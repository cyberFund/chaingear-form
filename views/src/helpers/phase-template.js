module.exports = {
  commited: false,
  phase_num: 0,
  phase_name: '',
  phase_status: '',
  registration: {
    start_date: '',
    end_date: '',
    website: '',
    terms: ''
  },
  terms: {
    issued_tokens: '',
    sold_tokens: '',
    share_of_sold: 0,
    token_distribution_date: '',
    cap_limit: [
      {
        currency: 'USD',
        amount: ''
      }
    ],
    vesting: [
      {
        supply_percent: 0,
        lockup_condition: '',
        lockup_date: ''
      }
    ],
    crowdsale_addresses: []
  },
  dates: {
    start_date: '',
    end_date: '',
    duration: ''
  },
  raised_funds: [
    {
      currency: 'USD',
      amount: ''
    },
    {
      currency: 'ETH',
      amount: ''
    },
    {
      currency: 'BTC',
      amount: ''
    }
  ],
  prices: {
    token_final_price: [
      {
        currency: 'BTC',
        price: ''
      }
    ],
    bonuses: []
  },
  contract: []
}