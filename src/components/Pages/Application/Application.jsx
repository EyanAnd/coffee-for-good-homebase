import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"

export default function Application() {

    const doesFormExist = useSelector(store => store.existanceReducer)
    const currentApplication = useSelector( store => store.applicationReducer)
    // initalize history
    const history = useHistory();

    // initalize dispatch
    const dispatch = useDispatch();

    const userId = useSelector(store => store.user.id)
    // initalize useEffect
    useEffect(() => {
        console.log('in useEffect');
        dispatch({ type: 'FETCH_APP' })
        console.log(doesFormExist)
    }, [])

    // new useEffect 
    useEffect(() => {
        setApplication({
            ...currentApplication
        })
    }, [currentApplication])

    // set state for the form
    const [application, setApplication] = useState({ id: null, name: '', email: '', mission: '', impact: '', values: '', previous_partners: '', success_stories: '', collab: '', reporting: '', sharing: '', notes: '' })

    // dispatch here to POST in the saga 
    const saveHandler = () => {
        // this will update the application when the user hits the save button
        console.log(application);
        dispatch({ type: 'UPDATE_APP', payload: application })
    }
    console.log(doesFormExist)
    // click handler for dispatch to update the status maybe take the user_id in?
    const applicationSubmit = () => {
        console.log(application);
        dispatch({ type: 'SUBMIT_APP', payload: application });
        history.push('/user')
    }
    return (
        <div className="container">
            <p>Application questions in here</p>
            <label htmlFor="name">Name :<input type="text" value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} /></label>
            <label htmlFor="email">Email :<input type="text" value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} /></label>
            <label htmlFor="mission">Mission :<input type="text" value={application.mission} onChange={(e) => setApplication({ ...application, mission: e.target.value })} /></label>
            <label htmlFor="impact">Impact :<input type="text" value={application.impact} onChange={(e) => setApplication({ ...application, impact: e.target.value })} /></label>
            <label htmlFor="values">Values :<input type="text" value={application.values} onChange={(e) => setApplication({ ...application, values: e.target.value })} /></label>
            <label htmlFor="previous-partners">Previous Partners :<input type="text" value={application.previous_partners} onChange={(e) => setApplication({ ...application, previous_partners: e.target.value })} /></label>
            <label htmlFor="success-stories">Success Stories :<input type="text" value={application.success_stories} onChange={(e) => setApplication({ ...application, success_stories: e.target.value })} /></label>
            <label htmlFor="collaboration">Collaboration :<input type="text" value={application.collab} onChange={(e) => setApplication({ ...application, collab: e.target.value })} /></label>
            <label htmlFor="reporting">Reporting :<input type="text" value={application.reporting} onChange={(e) => setApplication({ ...application, reporting: e.target.value })} /></label>
            <label htmlFor="sharing">Sharing :<input type="text" value={application.sharing} onChange={(e) => setApplication({ ...application, sharing: e.target.value })} /></label>
            <label htmlFor="notes">Addiitonal Notes :<input type="text" value={application.notes} onChange={(e) => setApplication({ ...application, notes: e.target.value })} /></label>
            <button onClick={() => history.push('/user')}>Back</button>
            <button onClick={saveHandler}>Save Application</button>
            <button onClick={applicationSubmit}>Submit</button>
        </div>
    )
}