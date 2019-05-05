// libraries
import React from "react";
import { Link } from "react-router-dom";

export const BlockLink = props => (
  <Link to={`/blocks/${props.number}`}>{props.children || props.number}</Link>
)

export const TransactionLink = props => (
  <Link to={`/transactions/${props.hash}`}>{props.children || props.hash}</Link>
)

export const AccountLink = props => (
  <Link to={`/accounts/${props.address}`}>{props.children || props.address}</Link>
)
