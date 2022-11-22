import React from 'react';



import './Pagination.css';

const Pagination = (data) => {
    const NextPage = () => {
        if(data.page*15 < data.videogames.length)
            data.handler(data.page+1);
    }

    const PreviousPage = () => {
        if(data.page > 1)
            data.handler(data.page-1);
        else data.handler(1);
    }

        return (
            <div>                
                <button onClick={PreviousPage} className='nextbutton'>◄</button> 
                <input placeholder={data.page} className='PageInput' disabled></input>     
                <button onClick={NextPage} className='nextbutton'>►</button> 
            </div>
        );
};

export default Pagination;