import { Route, Redirect } from 'react-router-dom';
import { useSelector} from "react-redux";
import {RootState} from "../../services/reducers";

function ProtectedRoute({ children, ...rest }) {
    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuth ? (children) : (
                    // Если пользователя нет в хранилище, происходит переадресация на роут /login
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )

            }
        />
    );
}

export default ProtectedRoute;
