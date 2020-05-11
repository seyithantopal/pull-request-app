import React, { useState, useEffect } from 'react';
import './PullRequests.css';

const PullRequests = (props) => {
    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    let pullRequests = [];
    let ids = [];
    
    Object.entries(props.comments.prComments).map((comment, index) => {
        if(ids.indexOf(comment[1]['prNumber']) === -1) {
            ids.push(comment[1]['prNumber']);
            pullRequests.push(comment[1]);
        }
    });

    useEffect(() => {
        setFilteredData(pullRequests);
    }, []);

    const handleSearch = (event) => {
        let inputSearch = event.target.value;
        setInput(inputSearch);
        filter(event.target.value);
    }

    const changeMode = (event) => {
        const mode = event.target.dataset.mode;
        const id = event.target.dataset.id;
        props.changeMode(mode, id);
    }

    const filter = (input) => {
        let newData = [];
        pullRequests.map((el, i) => {
            if(el['prId'].toString().toLowerCase().indexOf(input) > -1 || el['prAuthor'].toString().toLowerCase().indexOf(input) > -1) {
                newData.push(el);
            }
        });
        setFilteredData(newData);
    } 

      
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="input-group mb-3 search-box">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="text" onChange={handleSearch} value={input} className="form-control" placeholder="Search by prId or prAuthor" aria-label="Search" aria-describedby="basic-addon1" autoFocus />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 lists">
                    {filteredData.map((request, i) =>
                        <div className="single-list" key={i}>
                        <div onClick={changeMode} className="title" data-mode="comment" data-id={request['prId']}>Pull request title Pull request title</div>
                    <div className="info">#{request['prId']} opened by <span className="request-user">{request['prAuthor']}</span></div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PullRequests;