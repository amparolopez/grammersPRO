import "./Center.css"
import { AiFillMessage } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const Center = () => {
    return (
        <div className="CenterContent">
            <div className="ContenedorCenter">
                <div className="ContenedorSecCenter">
                    <div className="ContenedorProfileCen">
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                        <div className="ContainerProfileTotal">
                            <div className="ContainerIconCent"></div>
                            <p>You</p>
                        </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="ContenedorPublicCen">
                        <div className="ContenedorFilerCent">
                            <p>Feeds</p>
                            <div>
                                <p>All</p>
                                <p>Following</p>
                                <p>Newest</p>
                                <p className="filtActiveCen">Popular</p>
                            </div>
                        </div>
                        <div className="ContainerTotalPublics">
                            <div className="publicContainerProfil">
                                <div className="ContainerImgPublic"></div>
                                <div className="publicProfilContainer">
                                    <div className="ProfilePublicTotal">
                                        <div></div>
                                        <p>Dean Winchester</p>
                                    </div>
                                    <div className="IconsPublicVoted">
                                        <AiFillHeart /><p>360</p>
                                        <AiFillMessage /><p>45</p>
                                    </div>
                                </div>
                            </div>
                            <div className="publicContainerProfil">
                                <div className="ContainerImgPublic"></div>
                                <div className="publicProfilContainer">
                                    <div className="ProfilePublicTotal">
                                        <div></div>
                                        <p>Dean Winchester</p>
                                    </div>
                                    <div className="IconsPublicVoted">
                                        <AiFillHeart /><p>360</p>
                                        <AiFillMessage /><p>45</p>
                                    </div>
                                </div>
                            </div>
                            <div className="publicContainerProfil">
                                <div className="ContainerImgPublic"></div>
                                <div className="publicProfilContainer">
                                    <div className="ProfilePublicTotal">
                                        <div></div>
                                        <p>Dean Winchester</p>
                                    </div>
                                    <div className="IconsPublicVoted">
                                        <AiFillHeart /><p>360</p>
                                        <AiFillMessage /><p>45</p>
                                    </div>
                                </div>
                            </div>
                            <div className="publicContainerProfil">
                                <div className="ContainerImgPublic"></div>
                                <div className="publicProfilContainer">
                                    <div className="ProfilePublicTotal">
                                        <div></div>
                                        <p>Dean Winchester</p>
                                    </div>
                                    <div className="IconsPublicVoted">
                                        <AiFillHeart className="ColorActiveLike"/><p className="ColorActiveLike">360</p>
                                        <AiFillMessage /><p>45</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vertical-line"></div>
        </div>
    )
}

export default Center
