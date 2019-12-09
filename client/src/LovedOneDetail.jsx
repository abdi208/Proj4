import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
class LovedOneDetail extends React.Component {

    state = {
        lovedone: [],
        name: '',
        price: '',
    }

    componentDidMount = () => {
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts`, config)
        .then(response => {
            console.log(response)
                this.setState(
                    { lovedone: response.data}
                    )
                })
    }

    handleChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('hitting')
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.post(`http://localhost:3001/api/lovedones/${this.props.match.params.id}/gifts`,{
            name: this.state.name,
            price: this.state.price
        }, config)
        .then(response => {
            this.setState({
                name: this.state.name,
                price: this.state.price,
                
            })
        }).catch(err => {
            console.log(err)
            console.log(this.state.redirect)
        })
    
    }

        render () {
    const mappedGifts = this.state.lovedone.map((lovedone, id) => <div key={id}><p><Link to={`/lovedone/${this.props.match.params.id}/giftedit/${lovedone._id}`}>{lovedone.name}</Link></p></div>)
            return (

                <>
                <div className='App'>
                    <h1>welcome to details</h1>
                    {mappedGifts}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} name='name' placeholder='Create a gift'/><br />
                        <input type="hidden" onChange={this.handleChange} name='price' placeholder='add a price'/><br />
                        <Button type="submit"><Link style={{color: 'black', textDecoration: 'none'}} to={'/profile'}>Submit</Link></Button>
                        
                    </form>
                </div>
                        
                </>
                
            )
        }
}

export default LovedOneDetail;