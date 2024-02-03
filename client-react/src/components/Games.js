import React from 'react';
import { isJSDocAuthorTag } from 'typescript';
import AuthenticationButton from './AuthenticationButton';

const Games = (props) => {

    return (
        <>
            <div className="flex flex-col text-l md:text-xl lg:text-2xl space-y-6"> 
            <div className="text-l">
                
            </div>
                <div className="flex flex-row space-x-6">
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <AuthenticationButton/>
                    </div>
                </div>
                <div className="flex flex-row space-x-6">
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Room 1</button>
                    </div>
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Room 2</button>
                    </div>
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Room 3</button>
                    </div>
                </div>
                <div className="flex flex-row space-x-6">
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Room 4</button>
                    </div>
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Room 5</button>
                    </div>
                    <div className="bg-gray-200 text-gray-800 text-l md:text-xl lg:text-2xl rounded-xl p-1 md:p-2 lg:p-3">
                        <button> Test 6</button>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Games;