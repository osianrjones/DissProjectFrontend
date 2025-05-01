//References:
// Economic Recovery Tax Act of 1981, Public Law 97-34
// Personal Responsibility and Work Opportunity Reconciliation Act of 1996
// No Child Left Behind Act of 2001, Public Law 107-110
// Patient Protection and Affordable Care Act, Public Law 111-148
export function getProposals(index) {
    const proposals = [
        {
            president: "Ronald Reagan",
            proposals: [
                "Economic Recovery Tax Act (1981)",
                "Defense Buildup (Strategic Defense Initiative)",
                "Smaller Government and Deregulation"
            ]
        },
        {
            president: "Bill Clinton",
            proposals: [
                "Omnibus Budget Reconciliation Act (1993)",
                "Welfare Reform (1996)",
                "North American Free Trade Agreement (NAFTA)"
            ]
        },
        {
            president: "George W. Bush",
            proposals: [
                "2001 and 2003 Tax Cuts",
                "No Child Left Behind Act (2002)",
                "Medicare Prescription Drug Benefit (2003)"
            ]
        },
        {
            president: "Barack Obama",
            proposals: [
                "Affordable Care Act (2010)",
                "American Recovery and Reinvestment Act (2009)",
                "Deferred Action for Childhood Arrivals (DACA, 2012)"
            ]
        }
    ];

    return proposals[index] || null; // return null if index is invalid
}
