import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IForm {
    keyword: string;
}

const Header = styled(motion.header)`
    width: 100%;
    height: 13vh;
    display: flex;
	position: fixed;
	justify-content: space-between;
    align-items: center;
	position: fixed;
	background-color: ${(props) => props.theme.bodyBgColor};
    z-index: 5;
`

const Col = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;


const HomeLogo = styled(motion.svg)`
	width: 90%;
	height: 90%;
  	transition: color 0.3s ease-in-out;
  path {
    stroke-width: 6px;
    stroke: ${(props) => props.theme.bodyFtColor};
  }
`;


const logoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: 1,
            duration: 3,
        },
    },
};

const Item = styled(motion.div)`
	font-size: 40%;
  margin-left: 5%;
  color: ${(props) => props.theme.bodyFtColor};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.hoverNavItem};
  }
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.hoverNavItem};
`;

const SearchDiv = styled.form`
	width: 30%;
  	height: 30px;
	margin: 1%;
	display: flex;
    justify-content: flex-end;
	align-items: center;
`
const Input = styled.input`
  transform-origin: right center;
  background-color: ${(props) => props.theme.bodyFtColor};
  border-radius: 10px;
  border: 5px solid #ced6e0;
  outline: none;
  color: ${(props) => props.theme.bodyBgColor};
  width: 60%;
  height: 30px;
  &:hover,&:focus {
      border-color: #3d9cff;
    }
`

const SearchIcon = styled(motion.svg)`
	height: 100%;
`

const HomeHeader = () => {
    const Array = [
        {
            link: `/`,
            match: useMatch('/'),
            name: "Home",
        },
        {
            link: `tv`,
            match: useMatch('tv'),
            name: "Tv",
        }
    ];

    const { register, handleSubmit } = useForm<IForm>();
    const navigate = useNavigate();

    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };
    return (
        <Header>
            <Col>
                <HomeLogo
                    variants={logoVariants}
                    whileHover="active"
                    initial="normal">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-stars" viewBox="0 0 500 100">
                        <path d="m50 7.63 13.44 27.24 30.06 4.36-21.75 21.21 5.13 29.93L50 76.24 23.12 90.37l5.13-29.93L6.5 39.23l30.06-4.36L50 7.63z" fill="#ffb804" />
                        <path d="M50.93 74.47h-1.86l-23.3 12.25 4.45-25.95-.57-1.77L10.8 40.63l26.04-3.79 1.51-1.09L50 12.15l11.65 23.6 1.51 1.09 26.04 3.79L70.35 59l-.57 1.77 4.45 25.95-23.3-12.25z" fill="#f90" />
                        <path d="m150 7.63 13.44 27.24 30.06 4.36-21.75 21.21 5.13 29.93L150 76.24l-26.88 14.13 5.13-29.93-21.75-21.21 30.06-4.36L150 7.63z" fill="#ffb804" />
                        <path d="M150.93 74.47h-1.86l-23.3 12.25 4.45-25.95-.57-1.77-18.85-18.37 26.04-3.79 1.51-1.09L150 12.15l11.65 23.6 1.51 1.09 26.04 3.79L170.35 59l-.57 1.77 4.45 25.95-23.3-12.25z" fill="#f90" />
                        <path d="m493.5 39.23-30.06-4.37L450 7.63l-13.44 27.24-30.06 4.36 21.75 21.2-5.13 29.94L450 76.24l26.88 14.13-5.13-29.94Zm-19.27 47.48-23.3-12.25h-1.86l-23.3 12.25 4.45-25.94-.57-1.77-18.85-18.37 26-3.78 1.51-1.09L450 12.15l11.65 23.6 1.51 1.09 26 3.78L470.35 59l-.58 1.77ZM393.5 39.23l-30.06-4.37L350 7.63l-13.44 27.24-30.06 4.36 21.75 21.2-5.13 29.94L350 76.24l26.88 14.13-5.13-29.94Zm-19.27 47.48-23.3-12.25h-1.86l-23.3 12.25 4.45-25.94-.57-1.77-18.85-18.37 26-3.78 1.51-1.09L350 12.15l11.65 23.6 1.51 1.09 26 3.78L370.35 59l-.58 1.77ZM293.5 39.23l-30.06-4.37L250 7.63l-13.44 27.24-30.06 4.36 21.75 21.2-5.13 29.94L250 76.24l26.88 14.13-5.13-29.94Zm-19.27 47.48-23.3-12.25h-1.86l-23.3 12.25 4.45-25.94-.57-1.77-18.85-18.37 26-3.78 1.51-1.09L250 12.15l11.65 23.6 1.51 1.09 26 3.78L270.35 59l-.58 1.77Z" fill="#ffb804" />
                        <path d="m236.84 36.84-26.04 3.79L229.65 59l.57 1.77-4.45 25.95 23.3-12.25h.93V12.15l-11.65 23.6-1.51 1.09z" fill="#f90" />
                    </svg>
                </HomeLogo>
                {
                    Array.map((i) => {
                        return (
                            <Item key={i.link}>
                                <Link to={`${i.link}`}>{i.name}
                                </Link>
                                {i.match !== null && <Circle layoutId="circle" />}
                            </Item>
                        )

                    })
                }
            </Col>
            <SearchDiv onSubmit={handleSubmit(onValid)}>
                <Input
                    placeholder="Search for movie or tv show..."
                    {...register("keyword", { required: true, minLength: 2 })}
                />
                <SearchIcon
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                </SearchIcon>
            </SearchDiv>
        </Header>

    );
}
export default HomeHeader;