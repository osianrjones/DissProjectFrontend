//References:
//[1] : https://www.britannica.com/biography/Barack-Obama
//[2] : https://www.britannica.com/biography/Barack-Obama
//[3] : https://www.britannica.com/biography/Bill-Clinton#ref384544
//[4] : https://www.britannica.com/biography/George-W-Bush#ref384545
export function getAbout(index) {
    const proposals = [
        {
            //[1]
            about:"\"Reagan campaigned actively for Nixon in his run for governor of California in 1962 and supported the presidential candidacy of conservative Republican Barry Goldwater in 1964, serving as cochairman of California Republicans for Goldwater. In the last week of the campaign, he delivered a 30-minute nationally televised address, “A Time for Choosing,” that The Washington Post described as “the most successful political debut since William Jennings Bryan electrified the 1896 Democratic convention with his ‘Cross of Gold’ speech.”",
        },
        {
            //[2]
            about:"\"In 1996 he was elected to the Illinois Senate, where, most notably, he helped pass legislation that tightened campaign finance regulations, expanded health care to poor families, and reformed criminal justice and welfare laws. In 2004 he was elected to the U.S. Senate, defeating Republican Alan Keyes in the first U.S. Senate race in which the two leading candidates were African Americans. While campaigning for the U.S. Senate, Obama gained national recognition by delivering the keynote address at the Democratic National Convention in July 2004.\"",
        },
        {
            //[3]
            about:"\"After an eventful two-year term as governor, Clinton failed in his reelection bid in 1980, the year his daughter and only child, Chelsea, was born. After apologizing to voters for unpopular decisions he had made as governor (such as highway-improvement projects funded by increases in the state gasoline tax and automobile licensing fees), he regained the governor’s office in 1982 and was successively reelected three more times by substantial margins. A pragmatic, centrist Democrat, he imposed mandatory competency testing for teachers and students and encouraged investment in the state by granting tax breaks to industries.\"",
        },
        {
            //[4]
            about:"\"In 1994 Bush challenged Democratic incumbent Ann Richards for the governorship of Texas. A major issue in the campaign concerned Bush’s sale of all his Harken stock in June 1990, just days before the company completed a second quarter with heavy losses. An investigation by the Securities and Exchange Commission (SEC) in 1991 into the possibility of illegal insider trading (trading that takes advantage of information not available to the public) did not uncover any wrongdoing.\"",
        }
    ];

    return proposals[index] || null; // return null if index is invalid
}