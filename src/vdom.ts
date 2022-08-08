import React from "react";
import * as reactDom from "react-dom";

import ReactJSX = JSX; // our reference to the JSX namespace

export type ReactComponentChild =
  | React.ReactNode
  | object
  | string
  | number
  | boolean
  | null
  | undefined;

declare global {
  namespace FullCalendarVDom {
    export import Ref = React.Ref;
    export import RefObject = React.RefObject;
    export import ComponentType = React.ComponentType;
    export import VNode = React.ReactNode;
    export import Context = React.Context;
    export import Component = React.Component;
    export type ComponentChild = ReactComponentChild;
    export type ComponentChildren = ReactComponentChild | ReactComponentChild[];
    export import createElement = React.createElement;
    export import render = reactDom.render;
    export import createRef = React.createRef;
    export import Fragment = React.Fragment;
    export import createContext = React.createContext;
    export import createPortal = reactDom.createPortal;
    export type VUIEvent = React.UIEvent;
    export function flushSync(callback: () => void): void;
    export function unmountComponentAtNode(node: HTMLElement): void;
  }
  namespace createElement {
    export import JSX = ReactJSX; // preact exports the h.JSX namespace whereas react has it global. use preact's technique
  }
}

(typeof globalThis !== "undefined" ? globalThis : window).FullCalendarVDom = {
  // TODO: streamline when killing IE11 support
  Component: React.Component,
  createElement: React.createElement,
  render: reactDom.render, // never called by FullCalendar's React component
  createRef: React.createRef,
  Fragment: React.Fragment,
  createContext: React.createContext,
  createPortal: reactDom.createPortal,
  flushSync,
  unmountComponentAtNode: reactDom.unmountComponentAtNode, // never called by FullCalendar's React component
};

export function flushSync(callback) {
  // always sync from top-level
  callback();
}
