'use client';
import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    className?: string;
    id?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ className, id, onChange, checked }) => {
    return (
        <StyledWrapper>
            <div className={`content ${className}`}>
                <label className="checkBox">
                    <input id={id} type="checkbox" onChange={onChange} checked={checked} aria-label="Checkbox"/>
                    <div className="transition" />
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .clear {
        clear: both;
    }

    .checkBox {
        display: block;
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: 3px solid rgba(255, 255, 255, 0);
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        box-shadow: 0px 0px 0px 2px #fff;
    }

    .checkBox div {
        width: 60px;
        height: 60px;
        background-color: #fff;
        top: -52px;
        left: -52px;
        position: absolute;
        transform: rotateZ(45deg);
        z-index: 100;
    }

    .checkBox input[type=checkbox]:checked + div {
        left: -10px;
        top: -10px;
    }

    .checkBox input[type=checkbox] {
        position: absolute;
        left: 50px;
        visibility: hidden;
    }

    .transition {
        transition: 300ms ease;
    }
`;

export default Checkbox;
