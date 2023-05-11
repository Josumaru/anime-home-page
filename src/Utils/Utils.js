import { useState } from "react"

export function ShowDashboardValue() {
    const [useShowDashboard, setShowDashboard] = useState(true)
    return [useShowDashboard, setShowDashboard]
}
