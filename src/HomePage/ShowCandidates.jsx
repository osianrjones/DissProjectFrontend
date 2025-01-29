import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {useEffect} from "react";





const ShowCandidates = () => {

    useEffect(() => {
        window.addEventListener('scroll', e => {handleScroll()})

        return () => {
            window.removeEventListener('scroll', e => {handleScroll()})
        };
    }, []);

    const handleScroll = () => {
        if (document.getElementById('downIcon')) {
            if (window.scrollY === 0) {
                if (document.getElementById('downIcon').classList.contains('hidden')) {
                    document.getElementById('downIcon').classList.remove('hidden')
                }
            } else {
                if (!document.getElementById('downIcon').classList.contains('hidden')) {
                    document.getElementById('downIcon').classList.add('hidden');
                    document.getElementById('candidates').style.marginBottom = '20px';
                }
            }
        }
    };


    const handleClick = () => {
        document.getElementsByClassName('odd')[0].scrollIntoView({behavior: 'smooth', block: 'end'});
        document.getElementById('downIcon').classList.add('hidden');
        document.getElementById('candidates').style.marginBottom = '20px';
    }

    const pulseStyle = {
        animation: 'pulse 1.5s infinite',
    };

    const pulseKeyframes = `
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2); /* Grow the icon */
    }
    100% {
      transform: scale(1);
    }
  }
`;

    return (
        <>
        <div id="show" className="flex flex-col items-center mt-32 ml-auto mr-auto text-5xl text-white font-bold">
            <a className="flex flex-col items-center ">
            <p id="candidates">Meet your Candidates</p>
                <div id="downIcon">
                    <KeyboardDoubleArrowDownIcon sx={{ fontSize:64 }} className="animate-pulse hover: text-7xl" onClick={handleClick}/>
                </div>
            </a>
        </div>
        </>
    )
}

export default ShowCandidates;