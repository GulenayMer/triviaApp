import {Tab, Tabs} from '@mui/material';
import GetQues from './GetQues'
import FetchQuestions from './FetchQuestions'
import OnlyOneQue from './OnlyOneQue'
import {useState} from 'react'

const TabsStyles = {
	color: '#000',
	fontSize: "1rem",

  };

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
		indicatorColor="secondary"
		>
		<Tab value={0}  label="Use JS Data" style={{...TabsStyles }} />
		<Tab value={1}  label="Fetch Questions" style={{...TabsStyles }}/>
		<Tab value={2}  label="Show One Question" style={{...TabsStyles }}/>
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
