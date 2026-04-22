/**
 * TYRANNO WONDERLAND — Full React App Scaffold
 * Designer: Yingqi Bi
 * Developer scaffold for production build
 *
 * SETUP:
 *   npm create vite@latest tyranno-wonderland -- --template react
 *   cd tyranno-wonderland
 *   npm install three @mediapipe/hands react-router-dom
 *   npm install @react-three/fiber @react-three/drei
 *   Place this file as src/App.jsx
 *
 * FONT USAGE (once assets are pushed to GitHub):
 *   @font-face {
 *     font-family: 'Tyranno';
 *     src: url('./assets/fonts/tyranno 2.0/Tyranno-Regular.woff') format('woff');
 *   }
 *   @font-face {
 *     font-family: 'TyrannoSkeleton';
 *     src: url('./assets/fonts/tyranno 1.0/Tyranno_skeleton-Regular.woff') format('woff');
 *   }
 *
 * GLYPH ASSET PATH CONVENTION:
 *   V2.0 skeleton fills: /assets/glyphs/tyranno skeleton/tyranno skeleton-{ID}.svg
 *   V1.0 thorns thin:    /assets/glyphs/tyranno thorns thin/tyranno thorns thin-{ID}.svg
 *   Bitmap style:        /assets/glyphs/tyranno bitmap/tyranno BITMAP-{ID}.svg
 *   Black fills:         /assets/glyphs/tyranno black/tyranno black-{ID}.svg
 *   Blurred/glow:        /assets/glyphs/tyranno blurred/tyranno blurred-{ID}.svg
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const TOKENS = {
  black:     '#050508',
  cyan:      '#00d4ff',
  amber:     '#d4a84b',
  amberLight:'#e8c06b',
  purple:    '#3d2060',
  purpleHaze:'#8855bb',
  fog:       '#0a0814',
  text:      '#c8c4b8',
  textDim:   '#4a4858',
  textMuted: '#28263a',
  border:    '#1a1728',
}

// ─── GLYPH DATA ───────────────────────────────────────────────────────────────
// Full 26-character Tyranno alphabet + GRAPH/KIT elements
// SVG paths for confirmed V2.0 skeleton glyphs are embedded inline.
// Remaining glyphs load from /assets/glyphs/tyranno skeleton/tyranno skeleton-{id}.svg
export const TYRANNO_GLYPHS = [
  // ── ALPHABET (A–Z) ──
  { id:'A', num:'01', name:'Awww',       code:'[A_awww]',      meaning:'/cute',              type:'alphabet' },
  { id:'B', num:'02', name:'My Bad',     code:'[B_my bad]',    meaning:'/sorry',             type:'alphabet' },
  { id:'C', num:'03', name:'Coming',     code:'[C_coming]',    meaning:'/chill',             type:'alphabet' },
  { id:'D', num:'04', name:'Delicious',  code:'[D_delicious]', meaning:'/appreciate',        type:'alphabet' },
  { id:'E', num:'05', name:'Eww',        code:'[E_eww]',       meaning:'/excuse me?',        type:'alphabet' },
  { id:'F', num:'06', name:'Feelin It',  code:'[F_feelin]',    meaning:'/really liking sth', type:'alphabet' },
  { id:'G', num:'07', name:'Going',      code:'[G_going]',     meaning:'/done talking',      type:'alphabet' },
  { id:'H', num:'08', name:'Homie',      code:'[H_homie]',     meaning:'/friendly',          type:'alphabet' },
  { id:'I', num:'09', name:'Me Myself',  code:'[I_me]',        meaning:'/represent T.Rex',   type:'alphabet' },
  { id:'J', num:'10', name:'JK',         code:'[J_jk]',        meaning:'/just kidding',      type:'alphabet' },
  { id:'K', num:'11', name:'Krazy',      code:'[K_krazy]',     meaning:'/intense or wild',   type:'alphabet' },
  { id:'L', num:'12', name:'Left',       code:'[L_left]',      meaning:'/direction ←',       type:'alphabet' },
  { id:'M', num:'13', name:'Mhm',        code:'[M_mhm]',       meaning:'/mood',              type:'alphabet' },
  { id:'N', num:'14', name:'No Clue',    code:'[N_no clue]',   meaning:'/dunno',             type:'alphabet' },
  {
    id:'O', num:'15', name:'OMG',        code:'[O_omg]',       meaning:'/shock',             type:'alphabet',
    viewBox:'0 0 469.92 449.86',
    paths:[
      'M469.37,222.49c-25.03-24.73-50.07-49.46-75.1-74.19-39.89-39.41-79.79-78.82-119.68-118.24-9.15-9.04-18.3-18.08-27.45-27.12C244.09-.08,236.54,0,232.69,0c-4.1,0-11.33-.22-14.46,2.94-24.51,24.72-49.02,49.44-73.53,74.16-39.07,39.41-78.15,78.81-117.22,118.22-8.98,9.05-17.96,18.11-26.93,27.16-.71.71-.71,1.42,0,2.13,24.58,25.08,49.17,50.17,73.75,75.25,39.03,39.82,78.05,79.64,117.08,119.46,8.95,9.13,17.9,18.27,26.86,27.4,3.87,3.95,13.49,3.18,18.45,2.8,1.44-.11,13.68-1.67,10.48-4.93-24.58-25.08-49.17-50.17-73.75-75.25-39.03-39.82-78.05-79.64-117.08-119.46-8.95-9.13-17.9-18.27-26.86-27.4v2.13c24.51-24.72,49.02-49.44,73.53-74.16,39.07-39.41,78.15-78.81,117.22-118.22,8.98-9.05,17.96-18.11,26.93-27.16h-28.93c25.03,24.73,50.07,49.46,75.1,74.19,39.89,39.41,79.79,78.82,119.68,118.24,9.15,9.04,18.3,18.08,27.45,27.12,3.96,3.92,13.42,3.18,18.45,2.8,1.4-.11,13.72-1.73,10.48-4.93h0Z',
      'M287.1,349.01c26.73-32.25,53.45-64.5,80.18-96.74,3.78-4.56,7.55-9.11,11.33-13.67,1.43-1.73-.32-3.28-1.51-4.28-14.77-12.4-29.54-24.81-44.3-37.21-23.58-19.81-47.16-39.61-70.75-59.42-5.47-4.6-10.94-9.19-16.41-13.79-3.49-2.93-10.91-2.88-14.95-2.65s-9.69.67-12.47,3.98c-28.2,33.58-56.4,67.16-84.61,100.73-4.04,4.8-8.07,9.61-12.11,14.41-3.74,4.46,8.46,6.62,10.48,6.83,5.3.55,14.56.75,18.45-3.88,28.2-33.58,56.4-67.16,84.61-100.73,4.04-4.8,8.07-9.61,12.11-14.41-9.14.44-18.28.88-27.42,1.33,14.77,12.4,29.54,24.81,44.3,37.21,23.58,19.81,47.16,39.61,70.75,59.42,5.47,4.6,10.94,9.19,16.41,13.79l-1.51-4.28c-26.73,32.25-53.45,64.5-80.18,96.74-3.78,4.56-7.55,9.11-11.33,13.67-3.71,4.48,8.44,6.62,10.48,6.83,5.27.55,14.6.76,18.45-3.88h0Z',
      'M246.62,253.32c-.15,5.22-1.64,10.31-4.96,14.43-1.54,1.91-3.42,3.54-5.48,4.86-3.83,2.44-9.2,2.19,1.78,2.19s5.62.25,1.78-2.19c-2.29-1.46-4.41-3.34-6.03-5.53-2.9-3.93-4.4-8.89-4.41-13.76-.02-10.31,6.18-17.51,15.16-21.48-14.84,6.57-16.88-2.06-11.48.5,1.1.52,2.16,1.03,3.19,1.69,1.81,1.15,3.52,2.57,4.94,4.19,3.68,4.19,5.34,9.6,5.5,15.1.12,4,30.1,3.6,30,0-.37-12.68-9.43-21.84-21.45-24.59-10.03-2.29-21.11-2.26-31.24-.63-6.29,1.02-12.56,3.21-17.15,7.81-8.55,8.55-9.91,21.88-2.66,31.69,9.71,13.13,29.6,12.98,44.18,11.44,14.6-1.54,27.86-9.69,28.33-25.72.1-3.49-29.88-4.1-30,0Z',
    ]
  },
  {
    id:'P', num:'16', name:'Props',      code:'[P_props]',     meaning:'/respect or credit', type:'alphabet',
    viewBox:'0 0 329.15 461.09',
    paths:[
      'M29.3,171.4c15.39-18.86,30.77-37.72,46.16-56.59,24.5-30.04,49-60.08,73.51-90.11,5.6-6.86,11.19-13.72,16.79-20.58h-28.93c18.35,18.85,36.71,37.71,55.06,56.56,29.24,30.03,58.48,60.07,87.72,90.1,6.69,6.87,13.38,13.75,20.07,20.62v-1.71c-19.85,13.98-39.71,27.96-59.56,41.94-31.62,22.26-63.23,44.53-94.85,66.79-7.22,5.08-14.44,10.17-21.66,15.25l-.54.86c6.92,18.33,13.83,36.66,20.75,54.99,11.09,29.4,22.18,58.8,33.27,88.2,2.53,6.72,5.07,13.43,7.6,20.15l15-3.22h-96.84c-2.04,0-15-.23-15,3.22s13.69,3.22,15,3.22h96.84c1,0,15.98-.62,15-3.22-8.28-21.95-16.57-43.91-24.85-65.86-11.34-30.05-22.67-60.1-34.01-90.15-.9-2.38-1.85-4.75-2.7-7.15-.06-.16-1.12,1.06-.11.33.78-.57,1.58-1.12,2.38-1.67,8.32-5.86,16.63-11.71,24.95-17.57,29.04-20.45,58.09-40.91,87.13-61.36,13.15-9.26,26.3-18.52,39.46-27.79,6.81-4.79,14.33-9.21,20.7-14.58.29-.25.64-.45.96-.67.71-.57.71-1.14,0-1.71-18.35-18.85-36.71-37.71-55.06-56.56-29.24-30.03-58.48-60.07-87.72-90.1-6.69-6.87-13.38-13.75-20.07-20.62C163.08-.33,154.6.05,151.29.05s-12.05-.6-14.46,2.36c-15.39,18.86-30.77,37.72-46.16,56.59-24.5,30.04-49,60.08-73.51,90.11-5.6,6.86-11.19,13.72-16.79,20.58-2.6,3.18,9.21,3.88,10.48,3.96,3.84.23,7.75.17,11.56-.32,1.86-.24,5.64-.39,6.89-1.92h0Z',
    ]
  },
  {
    id:'Q', num:'17', name:'Question',   code:'[Q_question]',  meaning:'/curious',           type:'alphabet',
    viewBox:'0 0 458.86 437.22',
    paths:[
      'M30.06,434.11c10.45-20.3,20.9-40.61,31.34-60.91,20.77-40.37,41.55-80.75,62.32-121.12,15.27-29.68,30.55-59.37,45.82-89.05,9.77-18.99,19.55-37.99,29.32-56.98,17.31-33.64,34.62-67.28,51.93-100.92.34-.67.69-1.34,1.03-2.01h-30c6.85,14.26,13.69,28.51,20.54,42.77,16.52,34.39,33.03,68.78,49.55,103.17,19.91,41.46,39.83,82.93,59.74,124.39,17.22,35.85,34.43,71.7,51.65,107.55,5.68,11.83,11.36,23.65,17.04,35.48,2.65,5.51,4.87,11.75,8.13,16.93.14.22.23.48.34.71,1.78,3.71,11.66,3.05,15,3.05,1.04,0,15.99-.98,15-3.05-6.85-14.26-13.69-28.51-20.54-42.77-16.52-34.39-33.03-68.78-49.55-103.17-19.91-41.46-39.83-82.93-59.74-124.39-17.22-35.85-34.43-71.7-51.65-107.55-5.68-11.83-11.36-23.65-17.04-35.48-2.65-5.51-4.87-11.75-8.13-16.93-.14-.22-.23-.48-.34-.71-1.78-3.71-11.66-3.05-15-3.05s-13.04-.75-15,3.05c-15.06,29.27-30.13,58.55-45.19,87.82-11.65,22.65-23.31,45.3-34.96,67.95-13.49,26.21-26.97,52.42-40.46,78.63-20.95,40.71-41.9,81.43-62.85,122.14-8.33,16.18-16.65,32.36-24.98,48.54l-8.28,16.08c-1.39,2.7-3.65,5.77-4.48,8.7-.11.38-.4.77-.58,1.13-1.12,2.17,13.9,3.05,15,3.05,3.43,0,13.04.75,15-3.05h0Z',
      'M143.39,157.54c23.95,25.75,47.89,51.49,71.84,77.24,3.42,3.68,6.84,7.35,10.26,11.03,2.68,2.88,11.07,2.59,14.46,2.59,3.57,0,11.91.49,14.46-2.59,20.92-25.22,41.85-50.44,62.77-75.66,2.93-3.53,5.86-7.06,8.79-10.59s-9.16-4.25-10.48-4.34c-3.83-.26-7.75-.19-11.56.36-1.95.28-5.56.51-6.89,2.11-20.92,25.22-41.85,50.44-62.77,75.66-2.93,3.53-5.86,7.06-8.79,10.59h28.93c-23.95-25.75-47.89-51.49-71.84-77.24-3.42-3.68-6.84-7.35-10.26-11.03-1.33-1.43-5.29-1.88-6.89-2.11-3.77-.54-7.77-.61-11.56-.36-1.46.1-13.3,1.3-10.48,4.34h0Z',
      'M14.84,304c14.66,22.42,29.32,44.85,43.99,67.27,2.09,3.2,4.19,6.41,6.28,9.61,2.29,3.5,11.39,2.78,15,2.78,1.02,0,15.88-1.43,15-2.78-14.66-22.42-29.32-44.85-43.99-67.27-2.09-3.2-4.19-6.41-6.28-9.61-2.29-3.5-11.39-2.78-15-2.78-1.02,0-15.88,1.43-15,2.78h0Z',
      'M235.48,136.94c-.12,3.62-1.07,7.19-3.56,9.98-.83.93-1.83,1.56-2.34,1.89-.26.17-.36.49-.49.29-.95.28-.82.26.41-.06l1.32-.09c.82,0,1.55.27,2.34.34l-1.23-.38c.87.31.91.27.13-.1-.52-.34-1.42-.88-2.34-1.89-2.44-2.68-3.56-6.44-3.56-9.98s1.01-6.8,3.19-9.47c.5-.61,2.31-2.22,2.15-2.1.77-.61,1-.66,1.05-.6.79-.23.82-.25.1-.07-.38.12-.77.18-1.17.17-1.03-.02-2-.21-3-.29.71.06,1.68.79.55.18,1.09.59,1.68.91,2.82,2.17,2.52,2.79,3.51,6.35,3.64,10.02.21,6.29,10.4,7.64,15,7.64,4.15,0,15.21-1.38,15-7.64-1.23-36.43-69.32-36.52-69.32,0s68.09,36.45,69.32,0c.35-10.42-29.64-10.79-30,0Z',
    ]
  },
  {
    id:'R', num:'18', name:'Right',      code:'[R_right]',     meaning:'/direction →',       type:'alphabet',
    viewBox:'0 0 254.73 449.19',
    paths:[
      'M.02,2.35c13.99,41.47,27.97,82.94,41.96,124.41,1.98,5.87,3.96,11.73,5.93,17.6.99,2.94,13.29,2.27,15,2.27,41.96,0,83.92,0,125.88,0,5.93,0,11.86,0,17.79,0-4.82-.96-9.64-1.91-14.46-2.87-16.94,15.65-33.88,31.3-50.82,46.96-11.13,10.29-22.27,20.57-33.4,30.86-3.17,2.93-6.35,5.87-9.52,8.8-.85.79-2.28,1.73-2.51,2.82-.31,1.51.81,4.27,1.09,5.77.76,4,1.51,8,2.27,12,2.39,12.61,4.77,25.22,7.16,37.83,6.14,32.44,12.28,64.87,18.42,97.31,2.49,13.14,4.97,26.27,7.46,39.41l2.5,13.18c.43,2.25.52,5.08,1.37,7.22.12.29.13.67.19.99.53,2.79,13.75,2.27,15,2.27,25.76,0,51.53,0,77.29,0h11.12c1.63,0,15,.27,15-2.27s-14.21-2.27-15-2.27c-25.76,0-51.53,0-77.29,0h-11.12c5,.76,10,1.51,15,2.27-3.12-16.49-6.25-32.99-9.37-49.48-6.06-32.01-12.12-64.02-18.18-96.02l-12.47-65.87c-.2-1.06-.34-3.28-.85-2.22.97-1.99,4.45-4.11,6.05-5.59,9.89-9.14,19.78-18.28,29.67-27.42,19.58-18.09,39.45-35.9,58.75-54.28.37-.35.75-.69,1.12-1.04,1.53-1.41-1.74-1.76-2.68-1.98-3.8-.87-7.91-.89-11.78-.89-41.96,0-83.92,0-125.88,0-5.93,0-11.86,0-17.79,0l15,2.27c-13.99-41.47-27.97-82.94-41.96-124.41-1.98-5.87-3.96-11.73-5.93-17.6C29-.67,17.43.08,15.02.08,13.93.08-.55.68.02,2.35H.02Z',
    ]
  },
  { id:'S', num:'19', name:'Stop!',      code:'[S_stop!]',     meaning:'/stop',              type:'alphabet' },
  { id:'T', num:'20', name:'True',       code:'[T_true]',      meaning:'/agree',             type:'alphabet' },
  { id:'U', num:'21', name:'Understand', code:'[U_understand]',meaning:'/got it',            type:'alphabet' },
  { id:'V', num:'22', name:'Vegen',      code:'[V_vegen]',     meaning:'/vegetables only',   type:'alphabet' },
  { id:'W', num:'23', name:'Whoa',       code:'[W_whoa]',      meaning:'/what do you mean',  type:'alphabet' },
  {
    id:'X', num:'24', name:'XOXO',       code:'[X_xoxo]',      meaning:'/kisses and hugs',   type:'alphabet',
    viewBox:'0 0 178.29 420.27',
    paths:[
      'M37.41,406.92c-2.16-36.33-4.32-72.66-6.49-108.99-.31-5.17-.62-10.35-.92-15.52l-2.05,2.64c20.37-13.06,40.73-26.13,61.1-39.19l13.57-8.7c2.33-1.49,4.78-2.63,5.96-5.18,1.84-4.01,2.72-8.85,4.01-13.05,16.68-54.31,33.37-108.61,50.05-162.92,5.2-16.92,10.4-33.84,15.59-50.76,1.54-5-27.33-8.68-30,0-7.86,25.57-15.71,51.15-23.57,76.72-12.51,40.72-25.02,81.45-37.53,122.17-2.86,9.3-5.71,18.59-8.57,27.89l2.05-2.64c-22.95,14.72-45.89,29.44-68.84,44.16-3.24,2.08-6.48,4.16-9.72,6.24-1.16.54-1.84,1.42-2.05,2.64,2.16,36.33,4.32,72.66,6.49,108.99.31,5.17.62,10.35.92,15.52.46,7.79,30.43,7.14,30,0h0Z',
      'M155.99,415.81c-5.33-20.64-10.65-41.28-15.98-61.92-8.54-33.08-17.07-66.16-25.61-99.23-1.95-7.55-3.9-15.09-5.84-22.64s-31.06-4.12-30,0c5.33,20.64,10.65,41.28,15.98,61.92,8.54,33.08,17.07,66.16,25.61,99.23,1.95,7.55,3.9,15.09,5.84,22.64s31.06,4.12,30,0h0Z',
    ]
  },
  {
    id:'Y', num:'25', name:'See Ya!',    code:'[Y_see ya!]',   meaning:'/farewell',          type:'alphabet',
    viewBox:'0 0 217.92 446.76',
    paths:[
      'M.54,5.92c11.62,18.48,23.23,36.97,34.85,55.45,24.42,38.86,48.84,77.72,73.27,116.58,21.58,34.34,43.16,68.68,64.75,103.02,4.82,7.68,9.4,15.6,14.51,23.09.23.34.65.83.77,1.23-.75-2.49-.99.19-1.34,1.3l-6.03,18.68c-12.27,38.05-24.54,76.09-36.81,114.14l-.86,2.67,15-4.67h-80.93c-3.01,0-14.7,0-15,4.67s13.05,4.67,15,4.67h80.93c3.85,0,13.48.06,15-4.67,11.1-34.41,22.19-68.81,33.29-103.22,2.72-8.42,5.43-16.85,8.15-25.27.95-2.95,3.72-7.76,2.54-10.77-.57-1.44-1.79-2.85-2.61-4.16l-7.33-11.66c-20.06-31.92-40.12-63.85-60.19-95.77-25.01-39.8-50.03-79.6-75.04-119.4-9.43-15.01-18.87-30.02-28.3-45.03-4.63-7.36-8.84-15.38-14.05-22.36-.24-.31-.42-.68-.63-1.01-1.07-1.7-5.33-2.49-6.89-2.79C18.86-.05,14.78-.15,11.02.18,8.72.39-2.19,1.58.54,5.92h0Z',
      'M15,336.35h64.74c3.57,0,13.81.06,15-4.67,11.75-46.58,23.5-93.15,35.25-139.73,1.69-6.7,3.38-13.4,5.07-20.1,1.17-4.65-27.98-8.02-30,0-11.75,46.58-23.5,93.15-35.25,139.73-1.69,6.7-3.38,13.4-5.07,20.1l15-4.67H15c-3.01,0-14.7,0-15,4.67s13.05,4.67,15,4.67h0Z',
    ]
  },
  {
    id:'Z', num:'26', name:"Z's",        code:'[Z_zs]',        meaning:'/sleep time',        type:'alphabet',
    viewBox:'0 0 211.17 444.05',
    paths:[
      'M29.5,65.82C72.33,47.53,115.16,29.23,157.99,10.93c6.11-2.61,12.21-5.22,18.32-7.83l-29.46-.65c3.62,26.4,7.25,52.8,10.87,79.2,6.03,43.92,12.06,87.84,18.08,131.76,1.65,11.99,3.29,23.98,4.94,35.97.2,1.48.4,2.1-.1,3.32-1.31,3.17-4.5,6.33-6.47,9.11-23,32.38-46,64.76-69.01,97.14-12.35,17.39-24.71,34.78-37.06,52.17-4.4,6.2-8.8,12.39-13.2,18.59-2.35,3.31-5.58,6.75-7.39,10.4-.24.49-.67.94-.98,1.38-.81,1.14,13.93,2.43,15,2.43,3.52,0,12.6.95,15-2.43,16.24-22.86,32.47-45.71,48.71-68.57,24.53-34.54,49.07-69.07,73.6-103.61,3.18-4.48,6.36-8.96,9.54-13.43.79-1.11,2.43-2.69,2.7-4.02.44-2.21-.79-5.79-1.1-7.99-.85-6.23-1.71-12.45-2.56-18.68-5.81-42.31-11.61-84.62-17.42-126.93l-8.4-61.18c-1.5-10.9-2.16-22.34-4.54-33.08-.11-.51-.14-1.04-.21-1.56-.36-2.62-11.66-2.36-13.01-2.39-5.29-.11-11.49-.38-16.46,1.74C104.55,20.11,61.72,38.41,18.88,56.71c-6.11,2.61-12.21,5.22-18.32,7.83-1.87.8,1.48,1.86,1.51,1.87,2.59.95,6.3.99,8.96,1.12,5.84.27,12.93.66,18.45-1.7h0Z',
      'M73.37,379.58c17.92-25.35,35.84-50.7,53.77-76.05,2.58-3.65,5.16-7.3,7.74-10.95,1.03-1.46-13.96-2.77-15-2.77-3.77,0-12.47-.81-15,2.77-17.92,25.35-35.84,50.7-53.77,76.05-2.58,3.65-5.16,7.3-7.74,10.95-1.03,1.46,13.96,2.77,15,2.77,3.77,0,12.47.81,15-2.77h0Z',
      'M53.41,338.33c16.91-24.21,33.82-48.42,50.74-72.63,2.4-3.44,4.8-6.87,7.2-10.31,3.97-5.68-6.8-9.82-10.48-10.4-6.55-1.04-14.45.18-18.45,5.91-16.91,24.21-33.82,48.42-50.74,72.63-2.4,3.44-4.8,6.87-7.2,10.31-3.97,5.68,6.8,9.82,10.48,10.4,6.55,1.04,14.45-.18,18.45-5.91h0Z',
    ]
  },

  // ── GRAPH / KIT ELEMENTS ──
  {
    id:'WATER', num:'GR', name:'Water',  code:'[GRAPH_WATER]', meaning:'/water logogram',    type:'graph',
    viewBox:'0 0 163.49 356.9',
    paths:[
      'M25.61,54.21c31.35-13.29,62.7-26.58,94.05-39.86,4.5-1.91,9-3.82,13.5-5.72l-25.07-5.09c-8.77,19.89-17.55,39.77-26.32,59.66-13.9,31.51-27.8,63.02-41.7,94.52-3.2,7.25-6.4,14.5-9.6,21.75-1.98,4.48,5.82,5.74,8.68,6.17,5.9.87,13.39.93,18.73-2.14,30.14-17.33,60.28-34.66,90.43-52,4.35-2.5,8.71-5.01,13.06-7.51l-27.95-2.64c-7.28,25.91-14.56,51.83-21.84,77.74-11.61,41.33-23.22,82.65-34.82,123.98-2.67,9.51-5.35,19.03-8.02,28.54-1.47,5.23,27.57,8.66,30,0,7.28-25.91,14.56-51.83,21.84-77.74,11.61-41.33,23.22-82.65,34.82-123.98,2.67-9.51,5.35-19.03,8.02-28.54.99-3.54-9.61-4.9-11.01-5.04-5.43-.54-12.08-.39-16.94,2.4-30.14,17.33-60.28,34.66-90.43,52-4.35,2.5-8.71,5.01-13.06,7.51,9.14,1.34,18.28,2.69,27.42,4.03,8.77-19.89,17.55-39.77,26.32-59.66,13.9-31.51,27.8-63.02,41.7-94.52,3.2-7.25,6.4-14.5,9.6-21.75,3.65-8.27-21.56-6.57-25.07-5.09-31.35,13.29-62.7,26.58-94.05,39.86-4.5,1.91-9,3.82-13.5,5.72-1.34.57-4.39,1.67-4.39,3.7s3.05,3.21,4.39,3.7c5.97,2.17,15.24,2.53,21.21,0h0Z',
    ]
  },
  { id:'ROAR',   num:'GR', name:'Roar',        code:'[GRAPH_ROAR]',      meaning:'/roar logogram',       type:'graph' },
  { id:'DINO',   num:'GR', name:'Dino',        code:'[GRAPH_DINO]',      meaning:'/T.Rex identity',      type:'graph' },
  { id:'HUMAN',  num:'GR', name:'Human',       code:'[GRAPH_HUMAN]',     meaning:'/human identity',      type:'graph' },
  { id:'HOME',   num:'GR', name:'Home',        code:'[GRAPH_HOME]',      meaning:'/shared space',        type:'graph' },
  { id:'FOOD',   num:'GR', name:'Food',        code:'[GRAPH_FOOD]',      meaning:'/food logogram',       type:'graph' },
  { id:'BODY',   num:'GR', name:'Body',        code:'[GRAPH_BODY]',      meaning:'/body logogram',       type:'graph' },
  { id:'LEFT',   num:'GR', name:'Toward Left', code:'[GRAPH_LEFT]',      meaning:'/direction ←',         type:'graph' },
  { id:'RIGHT2', num:'GR', name:'Toward Right',code:'[GRAPH_RIGHT]',     meaning:'/direction →',         type:'graph' },
  { id:'NOSE',   num:'KT', name:'Nose',        code:'[KIT_NOSE]',        meaning:'/nose modifier',       type:'kit'   },
  { id:'EYE_T',  num:'KT', name:'Eye Teen',    code:'[KIT_EYE_TEEN]',    meaning:'/young eye modifier',  type:'kit'   },
  { id:'EYE_A',  num:'KT', name:'Eye Adult',   code:'[KIT_EYE_ADULT]',   meaning:'/adult eye modifier',  type:'kit'   },
  { id:'FEET',   num:'KT', name:'Feet',        code:'[KIT_FEET]',        meaning:'/feet modifier',       type:'kit'   },
  { id:'CLAW',   num:'KT', name:'Claw',        code:'[KIT_CLAW]',        meaning:'/claw modifier',       type:'kit'   },
]

// ─── GLYPH COMPONENT ─────────────────────────────────────────────────────────
// Renders inline SVG paths (V2.0 skeleton style) or falls back to <img> loading
// from /assets/glyphs/tyranno skeleton/tyranno skeleton-{id}.svg
export function TyrannoGlyph({ glyph, color = '#d4a84b', size = 80, className = '' }) {
  if (glyph.paths && glyph.viewBox) {
    return (
      <svg
        viewBox={glyph.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size, fill: color }}
        className={className}
      >
        {glyph.paths.map((d, i) => <path key={i} d={d} />)}
      </svg>
    )
  }
  // Asset-based fallback — resolves once GitHub assets are pushed
  const src = glyph.type === 'kit'
    ? `/assets/glyphs/tyranno skeleton/tyranno skeleton-${glyph.id}.svg`
    : `/assets/glyphs/tyranno skeleton/tyranno skeleton-${glyph.id}.svg`
  return (
    <img
      src={src}
      alt={glyph.name}
      style={{ width: size, height: size, filter: `brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(400%) hue-rotate(10deg)` }}
      className={className}
    />
  )
}

// ─── GESTURE TYPES (MediaPipe chapter .03 / .04 / .06) ────────────────────────
export const GESTURES = {
  OPEN_PALM:  { label: 'Open palm',  action: 'orbit / resume' },
  FIST:       { label: 'Fist',       action: 'freeze orbit'   },
  PINCH_OUT:  { label: 'Pinch out',  action: 'enlarge card'   },
  PINCH_IN:   { label: 'Pinch in',   action: 'return card'    },
  POINT:      { label: 'Index point',action: 'select glyph'   },
  PEACE:      { label: 'Peace / V',  action: 'confirm'        },
}

// ─── PARTICLE SYSTEM (Chapter .00 / .02) ─────────────────────────────────────
// Three.js particle field — bioluminescent cyan + amber + violet
export function ParticleField({ count = 2000, color1 = '#00d4ff', color2 = '#d4a84b' }) {
  const meshRef = useRef()
  const posRef  = useRef()

  useEffect(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    const cp = new THREE.Color('#8855bb')
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      const pick = Math.random()
      const c = pick < 0.5 ? c1 : pick < 0.8 ? c2 : cp
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    posRef.current = positions
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      meshRef.current.geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    }
  }, [count])

  useFrame((_, delta) => {
    if (meshRef.current && posRef.current) {
      const pos = posRef.current
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += delta * 0.04 * (0.5 + Math.random() * 0.5)
        if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry />
      <pointsMaterial size={0.06} vertexColors sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

// ─── FOG CANVAS (Chapter .00 Hero) ───────────────────────────────────────────
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{ background: '#050508', position: 'absolute', inset: 0 }}
    >
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.4} />
      <ParticleField count={1200} />
      <ambientLight intensity={0.2} />
    </Canvas>
  )
}

// ─── ORBIT RING (Chapter .06 Symbiosis Ring) ──────────────────────────────────
// SVG-based orbit display — gesture: open palm = orbit, fist = freeze, pinch = scale
export function SymbiosisRing({ glyphs, frozen = false }) {
  const [angle, setAngle]   = useState(0)
  const [active, setActive] = useState(null)
  const rafRef = useRef()
  const lastRef = useRef(performance.now())

  useEffect(() => {
    const loop = (now) => {
      if (!frozen) {
        const dt = (now - lastRef.current) / 1000
        setAngle(a => (a + dt * 0.18) % (Math.PI * 2))
      }
      lastRef.current = now
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [frozen])

  const rx = 280, ry = 120
  const cx = 400, cy = 240
  const count = glyphs.length

  return (
    <svg viewBox="0 0 800 480" style={{ width: '100%', maxWidth: 800 }}>
      {/* orbit ellipse */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#d4a84b22" strokeWidth="1" />
      {glyphs.map((g, i) => {
        const t = angle + (i / count) * Math.PI * 2
        const x = cx + rx * Math.cos(t)
        const y = cy + ry * Math.sin(t)
        const scale = 0.5 + 0.5 * ((Math.sin(t) + 1) / 2)
        const isActive = active === g.id
        return (
          <g
            key={g.id}
            transform={`translate(${x},${y}) scale(${isActive ? scale * 2.2 : scale})`}
            style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
            onClick={() => setActive(isActive ? null : g.id)}
          >
            <circle r={24} fill="#050508" stroke={isActive ? '#d4a84b' : '#1a1728'} strokeWidth={isActive ? 1.5 : 0.5} />
            {g.paths ? (
              <svg
                viewBox={g.viewBox}
                x={-14} y={-14} width={28} height={28}
                style={{ fill: isActive ? '#e8c06b' : '#d4a84b', overflow: 'visible' }}
              >
                {g.paths.map((d, pi) => <path key={pi} d={d} />)}
              </svg>
            ) : (
              <text textAnchor="middle" dominantBaseline="central" fontSize={14} fill="#d4a84b" fontFamily="Georgia,serif">{g.id}</text>
            )}
          </g>
        )
      })}
      {/* center label */}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={11} fill="#3a3848" fontFamily="Courier New,monospace" letterSpacing={4}>TYRANNO</text>
    </svg>
  )
}

// ─── TRANSLATION MACHINE (Chapter .06) ───────────────────────────────────────
// Human ↔ Tyranno frosted glass interface
export function TranslationMachine() {
  const [input,    setInput]    = useState('')
  const [output,   setOutput]   = useState('')
  const [mode,     setMode]     = useState('human-to-tyranno')
  const [balloon,  setBalloon]  = useState(false)
  const [sending,  setSending]  = useState(false)

  const DICT = Object.fromEntries(
    TYRANNO_GLYPHS
      .filter(g => g.type === 'alphabet')
      .map(g => [g.name.toLowerCase(), g.code])
  )

  const translate = useCallback(() => {
    if (!input.trim()) return
    setSending(true)
    setTimeout(() => {
      let result
      if (mode === 'human-to-tyranno') {
        result = input.split(' ').map(word => DICT[word.toLowerCase()] || `[${word}]`).join(' ')
      } else {
        result = input.replace(/\[([A-Z_]+)\]/g, (_, key) => {
          const g = TYRANNO_GLYPHS.find(x => x.id === key || x.code === `[${key}]`)
          return g ? g.name : key
        })
      }
      setOutput(result)
      setBalloon(true)
      setSending(false)
      setTimeout(() => setBalloon(false), 3200)
    }, 600)
  }, [input, mode])

  return (
    <div style={{
      background: 'rgba(8,6,14,0.85)',
      backdropFilter: 'blur(24px)',
      border: '1px solid #1a1728',
      borderRadius: 2,
      padding: '2.5rem 2rem',
      maxWidth: 560,
      margin: '0 auto',
      position: 'relative',
    }}>
      <p style={{ fontSize: '0.58rem', letterSpacing: '0.5em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        Translation Engine — Chapter .06
      </p>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '1px', marginBottom: '2rem', background: '#0f0d14' }}>
        {['human-to-tyranno','tyranno-to-human'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1, padding: '0.7rem', background: mode === m ? '#d4a84b0a' : 'transparent',
              border: 'none', borderBottom: mode === m ? '1px solid #d4a84b' : '1px solid transparent',
              color: mode === m ? '#d4a84b' : '#3a3848',
              fontFamily: 'Courier New,monospace', fontSize: '0.6rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            {m === 'human-to-tyranno' ? 'Human → Tyranno' : 'Tyranno → Human'}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={mode === 'human-to-tyranno' ? 'Type a word or phrase...' : 'Enter Tyranno code e.g. [A_awww] [P_props]'}
        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), translate())}
        style={{
          width: '100%', minHeight: 90, background: '#050508', border: '1px solid #1a1728',
          color: '#c8c4b8', fontFamily: 'Courier New,monospace', fontSize: '0.8rem',
          padding: '1rem', resize: 'none', outline: 'none', letterSpacing: '0.05em',
          marginBottom: '1rem',
        }}
      />

      {/* Send */}
      <button
        onClick={translate}
        disabled={sending}
        style={{
          width: '100%', padding: '0.9rem', background: sending ? '#d4a84b22' : 'transparent',
          border: '1px solid #d4a84b', color: '#d4a84b',
          fontFamily: 'Courier New,monospace', fontSize: '0.65rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s',
          marginBottom: output ? '1.5rem' : 0,
        }}
      >
        {sending ? '— translating —' : 'Send →'}
      </button>

      {/* Output balloon */}
      {output && (
        <div style={{
          background: '#0c0a14', border: '1px solid #d4a84b33', padding: '1.2rem',
          fontFamily: 'Courier New,monospace', fontSize: '0.82rem', color: '#e8c06b',
          letterSpacing: '0.08em', lineHeight: 1.8,
          animation: balloon ? 'riseUp 0.5s ease forwards' : 'none',
        }}>
          <p style={{ fontSize: '0.52rem', color: '#3a3848', letterSpacing: '0.3em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            {mode === 'human-to-tyranno' ? 'Tyranno output' : 'Human translation'}
          </p>
          {output}
        </div>
      )}

      <style>{`@keyframes riseUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}

// ─── CHAPTER SHELL ────────────────────────────────────────────────────────────
const CHAPTERS_META = [
  { num:'.00', slug:'hero',        title:'Arrival',         desc:'Fog-clearing 3-phase entry sequence with particle field' },
  { num:'.01', slug:'wonderland',  title:'Wonderland',      desc:'2050 bioluminescent ecosystem — humans, animals, T.Rex coexist' },
  { num:'.02', slug:'skeleton',    title:'Skeleton Field',  desc:'3D interactive T.Rex skeletal system viewer' },
  { num:'.03', slug:'alphabet',    title:'Tyranno Alphabet',desc:'V1.0 font — gesture-based glyph reveal (MediaPipe)' },
  { num:'.04', slug:'maze',        title:'The Maze',        desc:'V2.0 — 3D logo maze, treasure hunt, card evolution' },
  { num:'.05', slug:'memory',      title:'Memory Field',    desc:'Video, audio and documentation archive' },
  { num:'.06', slug:'translation', title:'Translation',     desc:'Human ↔ Tyranno decryption interface' },
]

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [chapter, setChapter] = useState('hero')
  const [fogCleared, setFogCleared] = useState(false)
  const [orbFrozen, setOrbFrozen]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFogCleared(true), 800)
    return () => clearTimeout(t)
  }, [])

  const glyphsWithPaths = TYRANNO_GLYPHS.filter(g => g.paths)

  return (
    <div style={{ background: '#050508', minHeight: '100vh', color: '#c8c4b8', fontFamily: 'Courier New,monospace' }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050508; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: #1a1728; }
        /* Tyranno font — active once assets pushed to GitHub */
        @font-face {
          font-family: 'TyrannoV2';
          src: url('/assets/fonts/tyranno 2.0/Tyranno-Regular.woff') format('woff'),
               url('/assets/fonts/tyranno 2.0/Tyranno-Regular.ttf') format('truetype');
          font-weight: normal;
        }
        @font-face {
          font-family: 'TyrannoV1';
          src: url('/assets/fonts/tyranno 1.0/Tyranno_skeleton-Regular.woff') format('woff'),
               url('/assets/fonts/tyranno 1.0/Tyranno_skeleton-Regular.ttf') format('truetype');
          font-weight: normal;
        }
        .tyranno-v2 { font-family: 'TyrannoV2', 'Courier New', monospace; }
        .tyranno-v1 { font-family: 'TyrannoV1', 'Courier New', monospace; }
      `}</style>

      {/* ── HERO ── */}
      {chapter === 'hero' && (
        <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <HeroScene />

          {/* fog layer */}
          <div style={{
            position: 'absolute', inset: 0, background: '#050508', zIndex: 3,
            opacity: fogCleared ? 0 : 1, transition: 'opacity 2.8s ease', pointerEvents: 'none'
          }} />

          {/* hero content */}
          <div style={{
            position: 'relative', zIndex: 4, textAlign: 'center', padding: '2rem',
            opacity: fogCleared ? 1 : 0, transition: 'opacity 1.4s ease 1.1s, transform 1.4s ease 1.1s',
            transform: fogCleared ? 'translateY(0)' : 'translateY(24px)',
          }}>
            {/* mark glyph — P/PROPS as hero mark */}
            <TyrannoGlyph glyph={TYRANNO_GLYPHS.find(g => g.id === 'P')} size={64} color="#d4a84b" />

            <p style={{ fontSize: '0.58rem', letterSpacing: '0.6em', color: '#00d4ff', textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
              2050
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', fontWeight: 400, letterSpacing: '0.28em', color: '#e8e4d8', textTransform: 'uppercase', fontFamily: 'Georgia,serif', lineHeight: 1.1, marginBottom: '0.8rem' }}>
              Tyranno<br />Wonderland
            </h1>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.3em', color: '#4a4858', textTransform: 'uppercase', marginBottom: '2.8rem', lineHeight: 2 }}>
              A Speculative Language System<br />for Human–T. Rex Communication
            </p>
            <button
              onClick={() => setChapter('alphabetsalon')}
              style={{
                background: 'transparent', border: '1px solid #d4a84b', color: '#d4a84b',
                fontFamily: 'Courier New,monospace', fontSize: '0.62rem', letterSpacing: '0.45em',
                padding: '0.85rem 2.2rem', cursor: 'pointer', textTransform: 'uppercase',
              }}
            >
              Enter Wonderland →
            </button>
          </div>
        </section>
      )}

      {/* ── CHAPTER NAV (all non-hero chapters) ── */}
      {chapter !== 'hero' && (
        <>
          <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #0f0d14',
            display: 'flex', alignItems: 'center', padding: '0.8rem 2rem', gap: '1.5rem',
          }}>
            <button onClick={() => setChapter('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <TyrannoGlyph glyph={TYRANNO_GLYPHS.find(g => g.id === 'P')} size={28} color="#d4a84b" />
            </button>
            <span style={{ flex: 1, fontSize: '0.58rem', letterSpacing: '0.4em', color: '#3a3848', textTransform: 'uppercase' }}>
              Tyranno Wonderland — 2050
            </span>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {['alphabetsalon','symbiosis','translation'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setChapter(ch)}
                  style={{
                    background: 'none', border: 'none',
                    borderBottom: chapter === ch ? '1px solid #d4a84b' : '1px solid transparent',
                    color: chapter === ch ? '#d4a84b' : '#3a3848',
                    fontFamily: 'Courier New,monospace', fontSize: '0.58rem',
                    letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', padding: '0.2rem 0',
                  }}
                >
                  {ch === 'alphabetsalon' ? '.03 Alphabet' : ch === 'symbiosis' ? '.06 Symbiosis' : '.06 Translate'}
                </button>
              ))}
            </div>
          </nav>
          <div style={{ height: 60 }} />
        </>
      )}

      {/* ── ALPHABET SALON (.03) ── */}
      {chapter === 'alphabetsalon' && (
        <section style={{ padding: '4rem 2.5rem', minHeight: '100vh' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.6em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Chapter .03 — Tyranno Alphabet
          </p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.3em', color: '#e8e4d8', textTransform: 'uppercase', fontFamily: 'Georgia,serif', marginBottom: '0.5rem' }}>
            V1.0 Glyph Salon
          </h2>
          <p style={{ fontSize: '0.65rem', color: '#3a3848', letterSpacing: '0.1em', marginBottom: '3rem' }}>
            Hover to reveal — 26 characters + Graph / Kit elements — bone-derived oracle script
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', background: '#0a0812' }}>
            {TYRANNO_GLYPHS.map(g => (
              <GlyphCard key={g.id} glyph={g} />
            ))}
          </div>
        </section>
      )}

      {/* ── SYMBIOSIS RING (.06) ── */}
      {chapter === 'symbiosis' && (
        <section style={{ padding: '4rem 2.5rem', minHeight: '100vh' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.6em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Chapter .06 — Symbiosis Ring
          </p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.3em', color: '#e8e4d8', fontFamily: 'Georgia,serif', marginBottom: '0.5rem' }}>
            Orbital Glyph Display
          </h2>
          <p style={{ fontSize: '0.65rem', color: '#3a3848', letterSpacing: '0.1em', marginBottom: '2rem' }}>
            Open palm = orbit · Fist = freeze · Pinch = scale card
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => setOrbFrozen(f => !f)}
              style={{
                background: orbFrozen ? '#d4a84b0a' : 'transparent',
                border: '1px solid #d4a84b44', color: '#d4a84b',
                fontFamily: 'Courier New,monospace', fontSize: '0.6rem',
                letterSpacing: '0.3em', padding: '0.5rem 1.2rem', cursor: 'pointer', textTransform: 'uppercase',
              }}
            >
              {orbFrozen ? '▷ Resume orbit' : '⏸ Freeze orbit'}
            </button>
          </div>
          <SymbiosisRing glyphs={glyphsWithPaths} frozen={orbFrozen} />
        </section>
      )}

      {/* ── TRANSLATION ENGINE (.06) ── */}
      {chapter === 'translation' && (
        <section style={{ padding: '4rem 2.5rem', minHeight: '100vh' }}>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.6em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Chapter .06 — Translation Engine
          </p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.3em', color: '#e8e4d8', fontFamily: 'Georgia,serif', marginBottom: '3rem' }}>
            Human ↔ Tyranno
          </h2>
          <TranslationMachine />
        </section>
      )}

    </div>
  )
}

// ─── GLYPH CARD COMPONENT ─────────────────────────────────────────────────────
function GlyphCard({ glyph }) {
  const [hovered, setHovered] = useState(false)
  const typeColor = { alphabet: '#00d4ff', graph: '#d4a84b', kit: '#8855bb' }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#0c0a14' : '#050508',
        padding: '1.4rem 1.2rem', cursor: 'pointer',
        borderBottom: hovered ? `1px solid ${typeColor[glyph.type]}33` : '1px solid transparent',
        transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.5rem', color: '#1e1c2c', letterSpacing: '0.3em' }}>{glyph.num}</span>
        <span style={{ fontSize: '0.46rem', color: typeColor[glyph.type] + '55', border: `1px solid ${typeColor[glyph.type]}22`, padding: '0.18rem 0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {glyph.type === 'alphabet' ? 'A' : glyph.type === 'graph' ? 'G' : 'K'}
        </span>
      </div>
      <div style={{ height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
        <TyrannoGlyph
          glyph={glyph}
          size={80}
          color={hovered ? '#f0c05a' : '#d4a84b'}
        />
      </div>
      <p style={{ fontSize: '0.55rem', color: '#2a2838', letterSpacing: '0.4em', marginBottom: '0.22rem', textTransform: 'uppercase' }}>{glyph.id}</p>
      <h3 style={{ fontSize: '0.86rem', color: '#e8e4d8', letterSpacing: '0.18em', marginBottom: '0.22rem', fontFamily: 'Georgia,serif', fontWeight: 400 }}>{glyph.name}</h3>
      <p style={{ fontSize: '0.58rem', color: '#3a3848', letterSpacing: '0.08em', fontStyle: 'italic', marginBottom: '0.5rem' }}>{glyph.code}</p>
      <p style={{
        fontSize: '0.6rem', color: hovered ? '#4a4858' : '#1e1c2c',
        letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.8,
        borderTop: '1px solid #0f0d14', paddingTop: '0.4rem', marginTop: '0.2rem',
        transition: 'color 0.2s',
      }}>{glyph.meaning}</p>
    </div>
  )
}
