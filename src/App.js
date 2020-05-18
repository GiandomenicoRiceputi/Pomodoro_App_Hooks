import React, {useState, useRef} from 'react';
import './tailwind.generated.css';

function padTime(time) {
    return time.toString().padStart(2, '0')
}


function App() {
    // Hooks
    const [title, setTitle] = useState('Let the countdown begin!!')
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    // useRef
    let intervalRef = useRef(null);

// Start
    function startTimer() {
        if (intervalRef.current !== null) return

        setIsRunning(true)
        setTitle(`You're doing great!!`)
        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft >= 1 ? timeLeft - 1 : resetTimer());
        }, 1000)
    }

// Stop
    function stopTimer() {
        if (intervalRef.current === null) return

        clearInterval(intervalRef.current)
        intervalRef.current = null;
        setTitle('Keep it up!!')
        setIsRunning(false)
    }

// Reset
    function resetTimer() {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setTitle('Ready to go another round ?')
        setTimeLeft(25 * 60)
        setIsRunning(false)
    }

// Calc minuts
    const minutes = padTime(Math.floor(timeLeft / 60))
    // Calc seconds
    const seconds = padTime(timeLeft - minutes * 60)

    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center ">
            <h2 className="text-2xl md:text-6xl text-cool-gray-500 tracking-widest py-5">{title}</h2>
            <div className=" timer max-w-md mx-auto lg:max-w-5xl ">
                <span className="text-3xl md:text-6xl text-cool-gray-600  tracking-wide">{minutes}</span>
                <span className="text-3xl  md:text-6xl text-cool-gray-600 tracking-wide mx-2">:</span>
                <span className="text-3xl md:text-6xl text-cool-gray-600 tracking-wide">{seconds}</span>
            </div>
            <div className="mt-5 mx-auto max-w-screen  ">
                <div className="text-center">
                    <div className="buttons mt-5 max-w-screen  flex justify-center md:mt-8">
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            {!isRunning && <button onClick={startTimer}
                                                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-cool-gray-200 bg-green-600 hover:text-white focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                                Start
                            </button>}
                        </div>
                        <div className="mt-3 mx-2 rounded-md shadow sm:mt-0 sm:ml-3">
                            {!isRunning && <button onClick={resetTimer}
                                                   className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                                Reset
                            </button>}
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            {isRunning && <button onClick={stopTimer}
                                                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-cool-gray-200 bg-red-600 hover:text-white focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                                Stop
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
