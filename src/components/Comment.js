import React, { Component } from 'react';
import './Comment.css';

function Comment(props) {
    const id = props.id;
    let comments = Object.entries(props.comments.prComments).filter(comment => parseInt(comment[1].prId) === parseInt(id));

    const changeMode = (event) => {
        const mode = event.target.dataset.mode;
        props.changeMode(mode);
    }

    const dateFunction = (date) => {        
        const formattedDate = date.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
        const now = new Date().toISOString().split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
        const diffDays = parseInt((new Date(now) - new Date(formattedDate)) / (1000 * 60 * 60 * 24), 10); 
        if(diffDays === 0) return 'yesterday';
        if(diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;;
        if(diffDays >= 7  && diffDays < 30) return `${Math.floor(diffDays / 7)} ${Math.floor(diffDays / 7) === 1 ? 'week' : 'weeks'} ago`;;
        if(diffDays >= 30 && diffDays < 365) return `${Math.floor(diffDays / 30)} ${Math.floor(diffDays / 30) === 1 ? 'month' : 'months'} ago`;
        if(diffDays >= 365) return `${Math.floor(diffDays / 365)} ${Math.floor(diffDays / 365) === 1 ? 'year' : 'years'} ago`;       
    }

    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="request-title">Pull Request Title Pull Request Title Pull Request <span className="id">#{id}</span></div>
                    <hr />
                    <button onClick={changeMode} data-mode="default" className="btn go-back">Pull Requests</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 comments">
                    
                    {comments.map((comment, index) =>
                    <div className="single-comment" key={index}>
                    <div className="row">
                        <div className="col-md-6 personal-info">
                            <img src="images/user.jpg" className="comment-profile-picture" />
                            <div className="comment-user">{comment[1]['commentAuthor']}</div>
                        </div>
                        <div className="col-md-6 comment-date">
                            <div className="date">{dateFunction(comment[1]['commentCreatedAt'])}</div>
                            
                        </div>
                        <div className="col-md-12">
                            <div className="comment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                            <div className="labels">
                                <div className="label label-green text-center">{comment[1]['commentType']}</div>
                                <div className="label label-blue text-center">{comment[1]['commentTopic']}</div>
                            </div>
                        </div>
                    </div>
                </div>
                        
                    )} 

                </div>
            </div>
        </div>
    );


}

export default Comment;