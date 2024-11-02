
import { memo } from 'react'
import { useRespondentStore } from '@/Pages/Respondent/store';
import ResetButton from '@/Pages/Respondent/components/ResetButton';
import 'react-responsive-pagination/themes/classic.css';
import './cityHeavenResult.css';
import Skelton from './Skelton';
import useProcessedGirlsData from '@/Pages/Owner/hooks/useProcessedGirlsData';
import GirlsView from './GirlsView';
import ApiError from './ApiError';


const CityHeavenResult = () => {
  const answerHistories = useRespondentStore((state) => state.answerHistories);
  const { processedGirlsData, isFetching, errorMessage } = useProcessedGirlsData({ answerHistories });


  if (errorMessage) {
    return (<ApiError errorMessage={errorMessage} />)
  }

  if (isFetching) {
    return (<Skelton />)
  }


  return (
    <>

      <div className='h-full w-full flex flex-col justify-start items-center'>
        <GirlsView girlsData={processedGirlsData} />
        <ResetButton />
      </div>
    </>
  );
}
export default memo(CityHeavenResult);







