import {Tab, Tabs} from '@mui/material';
import GetQues from './GetQues'
import FetchQuestions from './FetchQuestions'
import OnlyOneQue from './OnlyOneQue'
import {useState} from 'react'

const TabFunc = () => {

	const [value, setValue] = useState(0);

	const handleChange = (e, newValue) => {
	setValue(newValue);
	};

	
return (
<>
	<Tabs
		value={value}
		onChange={handleChange}
		textColor="secondary"
		indicatorColor="secondary">
		<Tab value={0}  label="Use JS Data" />
		<Tab value={1}  label="Fetch Questions" />
		<Tab value={2}  label="Show One Question" />
    </Tabs>

	{value === 0 && (
        <div role="tabpanel" hidden={value !== 0}>
			<GetQues />
        </div>
    )}
    {value === 1 && (
        <div role="tabpanel" hidden={value !== 1}>
			<FetchQuestions />
        </div>
    )}
    {value === 2 && (
		<div role="tabpanel" hidden={value !== 2}>
			<OnlyOneQue />
        </div>
    )}
</>
)
}

export default TabFunc
