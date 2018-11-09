#!/usr/bin/env python
# coding: utf-8

# In[52]:


import os
import sys
from shutil import copyfile
from distutils.dir_util import copy_tree
from pprint import pprint
import inspect
import imp
import ast

DIR_ROOT = os.path.expanduser("~/otosense")

def module_path_gen(root_dir):
    for root, subdirs, files in os.walk(root_dir):
        for f in files:
            path = os.path.join(root, f)
            info = inspect.getmoduleinfo(path)
            if info is not None and info.module_type == imp.PY_SOURCE:
                yield path

def indexable_classes_and_functions(root_dir):
    for path in module_path_gen(DIR_ROOT):
        with open(path) as f:
        	try:
           		tree = ast.parse(f.read())
           	except SyntaxError:
        		continue
        for node in tree.body:
            if isinstance(node, ast.FunctionDef) or isinstance(node, ast.ClassDef):
                yield {
                    "path": path,
                    "name": node.name,
                    "type": "function" if isinstance(node, ast.FunctionDef) else "class",
                    "docstring": ast.get_docstring(node) or ""
                }

# print list(indexable_classes_and_functions(DIR_ROOT))