import React from "react"
import { Col, Row } from "antd"
import logo from "../../../assets/image/LogoSg.png"
import styles from "../loading/LoadingDisplay.module.css"
import getTheme from "../../utils/theme"
import { Backdrop, Card, CircularProgress } from "@mui/material"
import ReactLoading from 'react-loading';
interface LoadingDisplayLastProps {
    loading: boolean
}

const LoadingDisplayLast: React.FunctionComponent<LoadingDisplayLastProps> = ({
    loading = false,
}) => {
    return loading === true ? (
        <div
            style={{
                background: "rgba(0, 0, 0, 0.4)",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000000,
                top: 0,
                left: 0,
            }}
        >
            <Col>
                <div className={styles.logoanima}>
                    <Row
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            style={{
                                width: "285px",
                                height: "85px",
                            }}
                            src={logo}
                            draggable={false}
                            width="auto"
                        />
                    </Row>
                </div>
                <div
                    style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{ marginRight: 5, fontSize: 25, color: "#000" }}
                    >
                        Loading
                    </span>

                    <span>
                        {" "}
                        {/* <Backdrop open={loading} sx={{ color: '#fff', backgroundColor: 'rgba(0,0,0,.25)' }}> */}
                            <CircularProgress color="inherit" />
                        {/* </Backdrop> */}
                    </span>
                </div>
            </Col>
        </div>
    ) : null
}

export default LoadingDisplayLast
