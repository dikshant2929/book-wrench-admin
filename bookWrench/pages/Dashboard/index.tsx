import React from 'react';
import ShimmerEffect from '@common/elements/ShimmerEffect';

const Dashboard = () => {
    return (
        <>
            <ShimmerEffect height={150} count={3} visible={false} type="grid" />
            <h1 className="pt-24">I am in Dashboard</h1>
        </>
    );
};

export default Dashboard;
