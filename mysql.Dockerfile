FROM mysql:5.7

RUN echo 'sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES' >> /etc/mysql/conf.d/docker.cnf