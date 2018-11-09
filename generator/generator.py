import os
import sys
from shutil import copyfile
from distutils.dir_util import copy_tree
from pprint import pprint
import inspect
import imp

DIR_ROOT = os.path.expanduser("~/otosense")

def module_path_gen(root_dir):
    for root, subdirs, files in os.walk(root_dir):
        for f in files:
            path = os.path.join(root, f)
            info = inspect.getmoduleinfo(path)
            if info is not None and info.module_type == imp.PY_SOURCE:
                yield path

import ast
for path in module_path_gen(DIR_ROOT):
    print path
    with open(path) as f:
        tree = ast.parse(f.read())
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) or isinstance(node, ast.ClassDef):
            if ast.get_docstring(node) is not None:
                print ast.get_docstring(node)