import React from 'react';
import logo from '../../images/favicon.svg';

export const DefaultAvatar = (props: { avatar?: string }) => {
    const { avatar } = props;
    return (
        <img
            src={avatar || logo}
            // className="img-thumbnail rounded"
            alt="logo"
            height="75"
            width="75"
            style={{ borderRadius: '50%' }}
        />
    );
};
