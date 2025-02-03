import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        'http_req_duration': ['p(95)<2000'], /// 95% das requisições devem responder em menos de 2s
        'http_req_failed': ['rate<0.01'] // até 1% das requisições podem falhar
    }
}

export default function (data) {
    const url = ""
    const params = { headers: { "Content-Type": "application/json", } }
    const response = http.get(url, params)

    // console.log(response)

    check(response, { 'status is 200': (r) => r.status === 200, })

    sleep(1)
}

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
export function handleSummary(data) {
    return {
        "report/template.html": htmlReport(data),
    }
}