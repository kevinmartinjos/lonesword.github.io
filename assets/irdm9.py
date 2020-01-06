import numpy as np


def p_t_d(t, doc):
    return doc[t] / np.sum(doc)


def p_t_d_jm(t, doc, data, l=0.5):
    return (0.5 * doc[t]/np.sum(doc)) + 0.5 * np.sum(data[:,t])/np.sum(data)


def p_q_d_jm(q_list, doc, data):
    prob = 1
    for q in q_list:
        prob *= p_t_d_jm(q, doc, data)

    return prob


def p_t_d_dirichlet(t, doc, data, alpha=17):
    return (doc[t] + alpha * np.sum(data[:, t])/np.sum(data))/(np.sum(doc) + alpha)


def p_q_d_dirichlet(q_list, doc, data):

    prob = 1
    for q in q_list:
        prob *= p_t_d_dirichlet(q, doc, data)

    return prob


def p_q_d(q_list, doc):
    prob = 1
    for q in q_list:
        prob *= p_t_d(q, doc)

    return prob

if __name__ == "__main__":
    data = np.array([
        [4, 0, 0, 4, 0, 1, 1, 0, 0, 0],
        [1, 1, 0, 2, 0, 0, 0, 0, 1, 0],
        [3, 0, 0, 2, 0, 0, 0, 2, 1, 0],
        [1, 0, 2, 1, 1, 0, 2, 1, 2, 0],
        [2, 1, 1, 0, 2, 0, 5, 2, 0, 2],
        [1, 0, 0, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 2, 3, 1, 0, 4, 0, 0]
        ])

    D = np.sum(data)
    q1 = [2, 3, 4]
    q2 = [0, 7, 8]

    print("Naive")
    print("q1 top 3 docs")
    naive_q1 = [p_q_d(q1, data[i,:]) for i in range(len(data))]
    print([x+1 for x in reversed(np.argsort(naive_q1)[-3:])])
    print("q2 top 3 docs")
    naive_q2 = [p_q_d(q2, data[i,:]) for i in range(len(data))]
    print([x+1 for x in reversed(np.argsort(naive_q2)[-3:])])

    print("\n\nJM")
    print("q1 top 3 docs")
    jm_q1 = [p_q_d_jm(q1, data[i,:], data) for i in range(len(data))]
    print([x+1 for x in reversed(np.argsort(jm_q1)[-3:])])
    print("q2 top 3 docs")
    jm_q2 = [p_q_d_jm(q2, data[i,:], data) for i in range(len(data))]
    print([x + 1 for x in reversed(np.argsort(jm_q2)[-3:])])

    print("\n\nDirichlet")
    print("q1 top 3 docs")
    dirichlet_q1 = [p_q_d_dirichlet(q1, data[i,:], data) for i in range(len(data))]
    print([x + 1 for x in reversed(np.argsort(dirichlet_q1)[-3:])])
    print("q2 top 3 docs")
    dirichlet_q2 = [p_q_d_dirichlet(q2, data[i,:], data) for i in range(len(data))]
    print([x+1 for x in reversed(np.argsort(dirichlet_q2)[-3:])])

