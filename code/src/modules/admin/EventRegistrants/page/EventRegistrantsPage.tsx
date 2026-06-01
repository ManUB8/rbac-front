import React from 'react';
import { useFetchEventRegistrants } from '../hook/useFetchEventRegistrants';
import HeadEvent from '../components/page/HeadEvent';
import FilterEvent from '../components/page/FilterEvent';
import EventTable from '../components/page/EventTable';

export interface IEventRegistrantsPageProps { };

const EventRegistrantsPage: React.FunctionComponent<IEventRegistrantsPageProps> = props => {
    const mastercontroller = useFetchEventRegistrants()
    return (
        <>
            <HeadEvent total={mastercontroller.total_all} />
            <FilterEvent mastercontroller={mastercontroller} />
            <EventTable mastercontroller={mastercontroller} />
        </>
    )
};

export default EventRegistrantsPage;