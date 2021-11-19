import { Route, Redirect } from 'react-router-dom';
import { useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import React from "react";
import {RouteProps} from 'react-router'

const ProtectedRoute = ({ children, ...props }: RouteProps) => {
    const isLoading = useSelector((store: RootState) => store.user.loading)
    const isAuth = useSelector((store: RootState) => !!store.user.data)

    if (isLoading === 'loading') {
        return null
    }

    return (
        <Route
            {...props}
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
