const WelcomeMessage = () => {
    return (
        <div className="my-16">
            <img className="mx-auto mb-4 w-64 lg:w-96" src="../../assets/fitness_tracker.svg" alt="Fitness Tracker"/>
            <div className="flex justify-center items-center mt-8 text-center">
                <h1 className="text-center text-4xl font-bold">Welcome to Log</h1>
                <h1 className="text-center text-4xl font-bold text-indigo-600">Fit!</h1>
            </div>
            <p className="px-8 mt-8 text-center text-lg text-gray-500">LogFit is here to help you on your fitness journey. Our user-friendly interface makes it easy to record and monitor your workouts, allowing you to achieve your fitness goals efficiently.</p>
        </div>
    );
}

export default WelcomeMessage;