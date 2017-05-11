import React , { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import EmailInput from '../components/EmailInput'
import * as TodoActions from '../actions'


class App extends Component { 
  componentWillMount() {
    this.props.actions.getAllWords( this.props.actions.allWords )
  }
  
  render() {
    const { actions, email } = this.props
    return (
      <div>
        <Header email={email}{...actions} />
        <MainSection {...this.props} />
        <EmailInput 
            {...this.props} />  
      </div>
    )
  }
  
}

App.propTypes = {
  visibleModel: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  editStuts: PropTypes.string.isRequired,
  currentWord: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
   visibleModel: state.words.visibleModel,
   editStuts: state.words.editStuts,
   currentWord: state.words.currentWord,
   email: state.words.email,
   words: state.words.list,
   text: state.words.text
 }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
