import { motion, useTransform, useMotionValue } from "framer-motion";
import styled from "styled-components";

const containerVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1
    }
};
const Loader = styled.div`
    justify-content: center;
    align-items: end;
    display: flex;
    width: 100%;
    height: 50vh;
    margin: 20px;
`;

const LoadingMotion = styled(motion.svg)`
    width: 200px;
    height: 200px;
`
//큰 loading과 작은 로딩 만들기
const LoadingC = () => {
    return (
        <Loader>
            <LoadingMotion
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                xmlns="http://www.w3.org/2000/svg" aria-label="Loading..." className="By4nA" viewBox="0 0 100 100">
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".083" rx="3" ry="3" transform="rotate(-60 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".167" rx="3" ry="3" transform="rotate(-30 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".25" rx="3" ry="3" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".333" rx="3" ry="3" transform="rotate(30 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".417" rx="3" ry="3" transform="rotate(60 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".5" rx="3" ry="3" transform="rotate(90 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".583" rx="3" ry="3" transform="rotate(120 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".667" rx="3" ry="3" transform="rotate(150 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".75" rx="3" ry="3" transform="rotate(180 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".833" rx="3" ry="3" transform="rotate(210 50 50)" />
                <motion.rect variants={itemVariants} width="25" height="6" x="72" y="47" fill="white" opacity=".917" rx="3" ry="3" transform="rotate(240 50 50)" />
            </LoadingMotion>
        </Loader>
    );
};
export default LoadingC;