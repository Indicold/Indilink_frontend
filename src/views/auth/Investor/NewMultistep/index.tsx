import Step1 from './Step1';

const NewMultistep = () => {
    return (
        <div className='multistep-form lg:w-[550px] mx-auto'>
                <Step1 title={<label className='text-label-title'>Basic Details</label>} />
        </div>
    )
}

export default NewMultistep;