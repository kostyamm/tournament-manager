import { Button } from '@nextui-org/button';

export const TournamentRoundRobin = ({ schedule }: { schedule: Array<Array<Array<string>>> }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {schedule.map((round, index) => (
                <div key={index}>
                    <h2 className="border-b border-white/30 pb-4 mb-4">Round {index + 1}</h2>

                    <div className="flex flex-col gap-4">
                        {round.map(([first, second], index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <p>Match {index + 1}</p>
                                <div className="flex w-full gap-2">
                                    <Button variant="faded" fullWidth>
                                        {first}
                                    </Button>
                                    <div className="flex items-center text-xl text-white/40">VS</div>
                                    <Button variant="faded" fullWidth>
                                        {second}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};
