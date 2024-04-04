import { startOfToday, startOfYesterday, subHours, subDays } from 'date-fns'

// Helper function to parse a natural-language date string into an ISO date
export default (d, startDate) => {
  try {
    if (d === 'start') {
      return startDate;
    } else if (d === 'now' || d === 'end') {
      return new Date().toISOString()
    }
    else if (d === 'today') {
      return startOfToday().toISOString()
    }
    else if (d === 'yesterday') {
      return startOfYesterday().toISOString()
    }
    else if (/(hours? ago)$/.test(d)) {
      // return the same minute n hours ago
      const [diff] = d.match(/\d+/)
      return subHours(new Date(), diff).toISOString()
    }
    else if (/(days? ago)$/.test(d)) {
      // return the start of today - n days
      const [diff] = d.match(/\d+/)
      return startOfToday(subDays(new Date(), diff)).toISOString()
    }
  } catch(e) {
    console.log(`Error converting ${d} into a date`)
    console.log(e)
  }

  // Just return the value if we couldn't parse it
  return d;
}
