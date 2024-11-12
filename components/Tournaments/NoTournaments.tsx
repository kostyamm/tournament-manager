import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export const NoTournaments = () => {
    return (
        <Card className="py-6 px-2">
            <CardBody className="flex flex-col text-center">
                <h2 className="mb-2">No tournaments yet</h2>
                <p>Create your first tournament to get started</p>
            </CardBody>
            <CardFooter className="flex justify-center py-6">
                <Button as={Link} href="/tournaments/create" variant="shadow" color="primary">
                    Create Tournament
                </Button>
            </CardFooter>
        </Card>
    );
};