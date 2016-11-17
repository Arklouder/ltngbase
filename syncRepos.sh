#!/bin/bash
PRL="../prlPackage"
APAB="../AnyPathPackage"

cp -r src/aura/* $PRL/src/aura
cp -r src/aura/* $APAB/src/aura

cp src/classes/* $PRL/src/classes
cp src/classes/* $APAB/src/classes

cp src/staticresources/* $PRL/src/staticresources
cp src/staticresources/* $APAB/src/staticresources
