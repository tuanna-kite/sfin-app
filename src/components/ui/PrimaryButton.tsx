import { StyleSheet, Text, ButtonProps } from 'react-native'
import React from 'react'
import { Button } from 'native-base'

type PrimaryButtonProps = {
  text?:string
}& ButtonProps

const PrimaryButton = (props:PrimaryButtonProps) => {
  const {text, ...primaryButtonProps} = props
  return (
    <Button rounded={'lg'} color={'#F8A01E'} {...primaryButtonProps}>{text}</Button>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({})