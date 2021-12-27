import { useLocation } from 'react-router-dom'

export default function withRouter( Child ) {
    return ( props ) => {
        const location = useLocation();
        return <Child { ...props } location={ location } />;
    }
}