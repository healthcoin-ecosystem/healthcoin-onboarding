import React, {Component} from "react"
import {Message, List} from 'semantic-ui-react'

export default class ErrorMessages extends Component {
  render() {
    const {header, errorMessages} = this.props
    return (
      <Message negative>
        <Message.Header>{header}</Message.Header>
        <List bulleted>
          {errorMessages.map((m, i) => (<List.Item key={i}>{m}</List.Item>))}
        </List>
      </Message>
    )
  }
}
